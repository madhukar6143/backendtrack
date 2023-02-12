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




app.get('/location', async (req, res, next) => {


    await mongoClient.connect(dbConnectionString)
        .then(client => {
            //create DB object
            const dbObj = client.db("portfolio");
            //get collection object

            dataCollectionObject = dbObj.collection("locationData")
            //share userCollectionObj
            console.log("Connected to locationDB ")
        })
        .catch(err => console.log("err in connecting to DB ", err))

   
})


app.get('/message', async (req, res, next) => {


    await mongoClient.connect(dbConnectionString)
        .then(client => {
            //create DB object
            const dbObj = client.db("portfolio");
            //get collection object

            dataCollectionObject = dbObj.collection("messageData")
            //share userCollectionObj
            console.log("Connected to messageDB ")
        })
        .catch(err => console.log("err in connecting to DB ", err))

    
})




app.get('/track', async (req, res, next) => {


    await mongoClient.connect(dbConnectionString)
        .then(client => {
            //create DB object
            const dbObj = client.db("portfolio");
            //get collection object

            dataCollectionObject = dbObj.collection("track")
            //share userCollectionObj
            console.log("Connected to locationDB ")
        })
        .catch(err => console.log("err in connecting to DB ", err))

    
})



app.use(requestIp.mw());
app.use(async (req, res) => {
    await mongoClient.connect(dbConnectionString)
        .then(client => {
            //create DB object
            const dbObj = client.db("portfolio");
            //get collection object

            dataCollectionObject = dbObj.collection("locationData")
            //share userCollectionObj
            console.log("Connected to locationDB ")
        })
        .catch(err => console.log("err in connecting to DB ", err))


    const clientIp = req.clientIp;
    let info = await ipfetch.getLocationNpm(clientIp);
    let userOfDB = await dataCollectionObject.findOne({
        "query": info.query
    });
     console.log(info.query,info.city,info.org)
    if (userOfDB !== null) {
        userOfDB = { ...userOfDB, count: userOfDB.count + 1 }
        let res = await dataCollectionObject.updateOne(
            { query: userOfDB.query },
            { $set: { ...userOfDB } }
        );
        //if date existed update

        //response.send({ message: "Message Sentvhgvghhgfhj" });
    }
    //if user not existed add new
    else {
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
            "query": info.query,
            "count": 1
        }
        await dataCollectionObject.insertOne(reqObj);
        // response.send({ message: "Message Sent" });
        //send res
    }
    
    res.send({ message: "visit https://madhukar-eppalapelly.netlify.app" })
}
)




const port = 3000;
app.listen(port, () => console.log("server on port 3000..."))






