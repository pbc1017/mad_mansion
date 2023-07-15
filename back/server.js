
const { MongoClient, ServerApiVersion } = require('mongodb');
const express=require('express');
const axios=require("axios");
const cheerio=require("cheerio");
const fs=require('fs')
// const prompt=require('prompt-sync')({singint:true});

var app=express();
var server=require('http').createServer(app);
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.post('/api/login',async (req,res)=>{
  try{
    await client.connect();
    userdata=client.db('Users').collection('person');
    const result=await userdata.find(req.body).toArray();
    if(result.length>0)
    {
      //return user info
      res.json(result[0]);
    }
    else
    //login false
      res.json("false");
  }
  finally
  {
    client.close();
  }

});

server.listen(80,main);

//DB CODE

const uri = "mongodb+srv://gloveman50:zohCzGt3lh6icZKl@clustermad.qjzy8y9.mongodb.net/?retryWrites=true&w=majority";
//api key E2kpU7xTXiQrNi6WEWE6p1gNFC6dCpd4ZcMEuWHgsn0NHyc86dB3pGVSSwWED7Uz

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

function main() {
    //await collection.updateOne(QUERYDATA},{$set:{CHANGEDATA}})
    console.log("Server On");
}