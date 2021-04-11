import { Router } from "express";
import ProjectController from "../controllers/project";

export = (hypersign) => {

  const router = Router();

  router.post("/",  ProjectController.addProject);
  
  router.put("/",  ProjectController.updateProject)
  
  router.get("/",  ProjectController.getAllProject);
  
  router.get("/:id",  ProjectController.getProjectById);
  
  // Delete
  router.delete("/", (req, res) => {
    res.json({ message: "Hello World" });
  });
  

  return router;

}

