const express = require("express");
const app = express();
const requestIp = require('request-ip');
const axios =require("axios")
const ipfetch = require('ip-fetch');



 
const cors = require('cors')
const corsOptions ={
    origin:["http://localhost:3000","https://trackfrontend.netlify.app"], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(requestIp.mw());
app.use(async(req, res) =>{
    const clientIp = req.clientIp;
      let info = await ipfetch.getLocationNpm(clientIp);
        res.json({ip:info});
});


const port=3000;
app.listen(port,()=>console.log("server on port 3000..."))