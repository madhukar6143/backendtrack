const express = require("express");
const requestIp = require('request-ip');
const app = express();
const cors = require('cors')
const corsOptions ={
    origin:["http://localhost:3001","https://trackfrontend.netlify.app"], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(requestIp.mw());
app.use(function(req, res) {
    const clientIp = req.clientIp;
    console.log(clientIp)
    res.json({ip:clientIp});
});
const port=3000;
app.listen(port,()=>console.log("server on port 3000..."))