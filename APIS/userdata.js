const exp=require("express")
const userApi=exp.Router();
const mc=require("mongodb").MongoClient;
//connect angular app with express server

userApi.use(exp.json())
const databaseUrl="mongodb+srv://madhu:madhu@clusterbackend.szevd.mongodb.net/myfirstdb?retryWrites=true&w=majority"

let databaseObj;
let userCollectionsObj;
let locationCollectionsObj;

mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("error in database connection",err)
    }
    else{
        databaseObj=client.db("portfolio");
        console.log("Database connection is success")
    }
})

//get http://localhost:3000/user/getusers

//export module
module.exports=userApi