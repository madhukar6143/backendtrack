const express = require("express");
const app = express();
const requestIp = require('request-ip');
const axios = require("axios")
const ipfetch = require('ip-fetch');
const mongoClient = require("mongodb").MongoClient;
const dbConnectionString = "mongodb+srv://madhu:madhu@clusterbackend.szevd.mongodb.net/myfirstdb?retryWrites=true&w=majority"
let dataCollectionObject;


const cors = require('cors')
const corsOptions = {
    origin: ["https://madhukar-eppalapelly.netlify.app", "https://trackfrontend.netlify.app"],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));


mongoClient.connect(dbConnectionString)
    .then(client => {
        //create DB object
        const dbObj = client.db("portfolio");
        //get collection object

        dataCollectionObject = dbObj.collection("locationData")
        //share userCollectionObj
        console.log("Connected to locationDB ")
    })
    .catch(err => console.log("err in connecting to DB ", err))


app.use(requestIp.mw());
app.use(async (req, res) => {
    const clientIp = req.clientIp;
    let info = await ipfetch.getLocationNpm(clientIp);
    reqObj =
    {
        "country": info.country,
        "region": info.region,
        "regionName": info.regionName,
        "city": info.city,
        "zip": info.zip,
        "lat": info.lat,
        "lon": info.lon,
        "org": info.org,
        "as": info.as,
        "query": info.query
    }
    await dataCollectionObject.insertOne(reqObj);
    res.send({ip:clientIp})
});


const port = 3000;
app.listen(port, () => console.log("server on port 3000..."))