const { MongoClient, ServerApiVersion } = require('mongodb');
const express=require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs=require('fs')
// const prompt=require('prompt-sync')({singint:true});

// import * as roomRepository from './data/room.js';
// import * as userRepository from './data/users.js';

var app=express();
var server=require('http').createServer(app);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended : false}));

app.post('/api/login',async (req,res)=>{
  try{
    console.log(req.body);
    await client.connect();
    userdata=client.db('User').collection('user');
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
    // client.close();
  }

});


app.post('/api/clickHeart',async (req,res)=>{
  try{
    console.log(req.body);
    await client.connect();
    const userdata = client.db("User").collection("user");

  // '$pull' 연산자를 사용해 '대전광역시 22'를 wishList에서 제거합니다.
    if(req.body.isHouseInWishlist){
      const result = await userdata.findOneAndUpdate(
        { id: req.body.userId },
        { $pull: { wishList: req.body.houseId } },
        { returnDocument: "after" }
      );
      res.json(result.value);
    }
    else {
      const result = await userdata.findOneAndUpdate(
        { id: req.body.userId },
        { $push: { wishList: req.body.houseId } },
        { returnDocument: "after" }
      );
      console.log(result.value);
      res.json(result.value);
    }
  }
  finally
  {
    // client.close();
  }

});


app.post('/api/map',async (req,res)=>{
  try {
    console.log(req.body);
    await client.connect();
    house=client.db('House').collection('house');
    const info = req.body;
    const result=await 
    house.find({
      $and: [
        {latitude: { $gte: info.swLatLng.lat, $lte: info.neLatLng.lat }},
        {longitude: { $gte: info.swLatLng.lng, $lte: info.neLatLng.lng }}
      ]}).toArray();
    res.json(result);
  }
  finally {
    // client.close();
  }
})

app.post('/api/getPostingsfromHouse',async (req,res)=>{
  try {
    console.log(req.body);
    await client.connect();
    Postings =client.db('Postings').collection('postings');
    const info = req.body;
    let result=await 
    Postings.find({placeId:  info.placeId }).toArray();
    result = result.map(item => {
      return {
        ...item,
        _id: item._id.toString()
      }
    });
    console.log(result);
    res.json(result);
  }
  finally {
    // client.close();
  }
})

app.post('/api/getPostingsfromUser', async (req,res)=>{
  //userProfile을 id를 보내면 user의 Postings를 반환
  
  try {
    
    console.log(req.body);
    await client.connect();
    house=client.db('Postings').collection('postings');
    const info = req.body;
    let result = await 
    Postings.find({writer:  info.id }).toArray();
    result = result.map(item => {
      return {
        ...item,
        _id: item._id.toString()
      }
    });
    console.log(result);
    res.json(result);
  }
  finally {
    // client.close();
  }
});

app.post('/api/getHouseFromApply', async (req, res) => {
try {
    //apply로부터 House를 찾아냄

    console.log(req.body);
    await client.connect();
    Applies=client.db('Postings').collection('applies');
    const info = req.body;
    console.log(info);
    let result = await 
    Applies.find({_id: new mongoose.Types.ObjectId(info._id) }).toArray();
    console.log(result);
    result = result.map(item => {
      return {
        ...item,
        _id: item._id.toString()
      }
    });
    console.log(result);
    res.json(result[0]);
    }
    finally {
      // client.close();
    }
})
server.listen(80,main);

//DB CODE

const uri = "mongodb+srv://knsol2:1017@cluster0.ussb1gv.mongodb.net/?retryWrites=true&w=majority";
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