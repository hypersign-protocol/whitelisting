import env from 'dotenv'
import path from 'path';
import fs from 'fs'
import HypersignSsiSDK  from 'hs-ssi-sdk';
import mongoose from 'mongoose';
const log = require('simple-node-logger');


env.config();

const log_dir = path.resolve(__dirname,'../log')

if(!fs.existsSync(log_dir)) fs.mkdirSync(log_dir)


// LOGGING
const log_path = path.resolve(__dirname, process.env.LOG_FILEPATH || 'ssi-infra.log')
const logger = log.createSimpleLogger({
    logFilePath: log_path,
    timestampFormat: process.env.LOG_TIMESTAMP_FORMAT || 'YYYY-MM-DD HH:mm:ss.SSS'
})
logger.setLevel(process.env.LOG_LEVEL || 'info')

const port = process.env.PORT || 6006;
const host = process.env.HOST || "localhost";
const hostnameurl = process.env.HOSTNAMEURL || `http://${host}:${port}`;

//DATABASE
const dbConnUrl = process.env.DB_URL && process.env.DB_URL != "" ? process.env.DB_URL :  "mongodb://admin:admin@cluster0-shard-00-00.jg0ef.mongodb.net:27017,cluster0-shard-00-01.jg0ef.mongodb.net:27017,cluster0-shard-00-02.jg0ef.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-n72avn-shard-0&authSource=admin&retryWrites=true&w=majority";
if(dbConnUrl){
    mongoose.connect(dbConnUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if(err){
            console.error("Error: could not connect to mongo database") 
        }else{
            console.log("Connected to mongo database")
        }
    })
} 

// DID Related: 
// TODO: Not required for this project. so remove
const did = {
    sheme : process.env.DID_SCHEME || 'did',
    method : process.env.DID_METHOD_NAME || 'hypersign',
}

const jwtSecret = process.env.JWT_SECRET || 'secretKey'
const jwtExpiryInMilli = 240000

const nodeServer = {
    baseURl: process.env.NODE_SERVER_BASE_URL ||  "http://localhost:5000/",//"https://ssi.hypermine.in/core/",
    didCreateEp: process.env.NODE_SERVER_DID_CREATE_EP || "api/did/register",
    schemaCreateEp: process.env.NODE_SERVER_SCHEMA_CREATE_EP || "api/schema/create",
    schemaGetEp: process.env.NODE_SERVER_SCHEMA_GET_EP || "api/v1/schema",
    schemaListEp: process.env.NODE_SERVER_SCHEMA_LIST_EP || "api/schema/list",
}

const hypersignSDK = new HypersignSsiSDK(
    { nodeUrl: nodeServer.baseURl } // Hypersign node url
  );


export  {
    port,
    host,
    logger,
    did,
    jwtSecret,
    jwtExpiryInMilli,
    nodeServer,
    hypersignSDK,
    hostnameurl
}