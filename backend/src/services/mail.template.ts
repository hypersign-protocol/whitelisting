export const template = 
    `
<html>

<head>
    <style>
        .colored {
            color: blue;
        }

        #body {
            background-color: #80808021
            font-size: 18px;
            border: 1px solid #80808021;
            padding:20px;
        }

        .center{
            margin: auto;
            width: 50%;
        }

        .mobile {
            display: none;
        }
        .web {
            display:block;
        }
        .button {
            background-color: #272831;
            /* blakish */
            border: none;
            color: #f1f1f1;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            cursor: pointer;
            width:30%;
        }

        @media only screen and (max-device-width : 640px) {

            /* Styles */
            .mobile {
                display: block;
            }
            .web {
                display:none;
            }
        }

        @media only screen and (max-device-width: 768px) {

            /* Styles */
            .mobile {
                display: block;
            }
            .web {
                display:none;
            }
        }
    </style>
</head>

<body>
    <div id='body' class="center">
        <p class='center'><h3>Hi @@RECEIVERNAME@@,</h3></p>
        <p class='colored'>
            Here is your @@APPNAME@@ credential. Click here to receieve the credential in your Hypersign Identity Wallet.
        </p>
        
        <p><a href='@@DEEPLINKURL@@' class="button">Get credential</a></p>
        <p>If the 'Get Credential' button (or link) does not work, then copy paste the url on your browser.</p>

        <p>@@URLTEXT@@</p>

        <p>This email is is only for receiving your verifiable credential, which you can re-use in the future in many other places including  whitelisting events.</p>
        <p>You will get a seperate email if you qualify for the event.</p>

        <br/>
        <br/>

        <p>Thanks & Regards <br /> Team Hypersign</p>
        <p></p>
    </div>
</body>

</html>
`
