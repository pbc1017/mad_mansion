const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
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
});
app.post('/api/makeApply', async (req, res) => {
    try {
        //req.body = { sender: "", postingId: "", content: "" }
        //res = apply 객체

        console.log(req.body);
        await client.connect();
        const Applies = client.db('Postings').collection('applies');
        const House = client.db('House').collection('house');
        const Posting = client.db('Postings').collection('postings');
        const User = client.db('User').collection('user');
        const info = req.body;

        const posting= await Posting.find({_id : new ObjectId(info.postingId)}).toArray();
        console.log(posting);
        const house= await House.find({id : posting[0].placeId}).toArray();
        console.log(house[0]);
        const receiver = await User.find({id : posting[0].writer}).toArray();
        const sender= await User.find({id : info.sender}).toArray();
        console.log(receiver[0]);
        console.log(sender[0]);

        const result = await Applies.insertOne({
            sender: info.sender,
            placeId: house[0].id,
            postingId: info.postingId,
            postingWriter: posting[0].writer,
            content : info.content,
            state: "waiting"
        });

        console.log(result.insertedId);
        const apply = await Applies.find({_id : result.insertedId}).toArray();
        console.log(apply[0]);

        console.log(sender[0].receivedApplyList);
        console.log(receiver[0].receivedApplyList);
        console.log(posting[0].receivedApplyList);

        
        console.log(result.insertedId.toString());

        const insertedIdString = result.insertedId.toString();
        User.updateOne(
            { id: receiver[0].id },
            { $push: { receivedApplyList: insertedIdString }},
        );

        User.updateOne(
            { id: sender[0].id },
            { $push: { applyList: insertedIdString }},
            
        );
        
        Posting.updateOne(
            { _id: new ObjectId(posting[0]._id) },
            { $push: { receivedApplyList: insertedIdString }}
        );
             
          
        res.json(apply[0]);
    }
    finally {
        // client.close();
    }
});

app.post('/api/makePosting', async (req, res) => {
  //   서버  URL:  '/api/makePosting'
// 요청 방식: POST
// req.body : { placeId : "" , userId : "" , title : "", content: ""}
// 수행 Postings.postings에 req에 맞춰 새로운 Posting 문서를 insert
// res : insert한 Posting 문서 객체를 반환

   try {
    // 데이터베이스와 콜렉션 선택
    const db = client.db('Postings');
    const postings = db.collection('postings');
    const User = client.db('User').collection('user');
    const House = client.db('House').collection('house');


    const house = await House.find({id : req.body.placeId}).toArray();
    console.log(house);
    // 새로운 Posting 문서 생성
    const newPosting = {
      _id: new ObjectId,
      maxNum: house[0].roomNum,  // You can adjust the default maxNum
      title: req.body.title,
      content: req.body.content,
      placeId: req.body.placeId,
      members: [req.body.userId],  // The writer is automatically a member
      writer: req.body.userId,
      receivedApplyList: []
    };

    House.findOneAndUpdate({id : req.body.placeId},
      { $push: { postingList: newPosting._id.toString() } });
    // 새로운 Posting 문서 저장
    const result = await postings.insertOne(newPosting);
    await User.updateOne(
            { id: newPosting.writer },
            { $push: { postingList: newPosting._id.toString() }}
        );
    await 
    // 결과 반환
    console.log(newPosting);
    res.json(newPosting);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post('/api/getReceivedApply', async (req, res) => {
  //   서버  URL:  '/api/getReceivedApply'
// 요청 방식: POST
// req.body : {userId : "" }
// 수행 Postings db의 apply collection의 state가 "waiting" && sender = req.body.userId인 apply들을 검색
// res : 해당 apply들의 배열을 반환 

  try {
    // Establish a connection to the database
    await client.connect();
    
    // Get the applies collection from the Postings database
    const Applies = client.db('Postings').collection('applies');
    
    // Find all applies that have a state of "waiting" and where the sender equals the userId from the request body
    const receivedApplies = await Applies.find({ 
      state: "waiting",
      sender: req.body.userId 
    }).toArray();

    // Respond with the array of applies
    res.json(receivedApplies);
  } 
  catch (error) {
    // Log the error and respond with a status code 500 and the error message
    console.error(error);
    res.status(500).json({ error: error.toString() });
  } 
  finally {
    // Close the database connection

  }
});

app.post('/api/decidingApply', async (req, res) => {
  try {
    // Establish a connection to the database
    await client.connect();
    
    // Get the applies collection from the Postings database
    const Applies = client.db('Postings').collection('applies');
    
    // Update the apply with the provided id in the request body
    const result = await Applies.updateOne(
      { _id: new ObjectId(req.body.applyId) },
      { $set: { state: req.body.switch ? 'accepted' : 'denied' } }
    );
    
    console.log(req.body);
    // If the update operation was successful, return the updated apply
    if(result.modifiedCount > 0) {
      const updatedApply = await Applies.findOne({ _id: new ObjectId(req.body.applyId) });
      res.json(updatedApply);
    } else {
      res.status(404).json({ error: 'No apply found with the provided id' });
    }
  } 
  catch (error) {
    // Log the error and respond with a status code 500 and the error message
    console.error(error);
    res.status(500).json({ error: error.toString() });
  } 
  finally {
    // Close the database connection
    //client.close();
  }
});

app.post('/api/getDetail', async (req, res) => {
  try {
    await client.connect();
    Applies=client.db('House').collection('house');
    let result = await Applies.find(req.body).toArray();
    res.json(result[0])
  }
  finally {}
})

app.post('/api/getRandomThreeHouse', async (req, res) => {
  try {
    const House = client.db('House').collection('house');

    // Retrieve a random sample of 3 documents from the House collection
    const houseList = await House.aggregate([{ $sample: { size: 3 }}]).toArray();
    
    res.status(200).json(houseList);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});//input: {id : id}

app.post('/api/getMyMansion', async (req, res) => {
  try {
    await client.connect();
    const house = client.db('House').collection('house');
    const post = client.db('Postings').collection('postings');
    const apply = client.db('Postings').collection('applies');

    const sentPostings = await apply.find({ sender: req.body.userId }).toArray();
    const receivedApplies = await apply.find({ postingWriter : req.body.userId }).toArray();

    console.log(sentPostings);
    console.log(receivedApplies);

    const sentResult = []
    const recieveResult = []
    
    for (let sent of sentPostings) {
      const sentPostingArray = await post.find({ "_id": new ObjectId(receive.postingId) }).toArray();
      
      if (sentPostingArray.length === 0) {
        console.error(`No posting found with id ${sent.postingId}`);
        continue;
      }
      
      const sentPosting = sentPostingArray[0];
      const sentHouse = (await house.find({ "id": sent.placeId }).toArray())[0];
      sentResult.push({ 
        "state": sent.state,
        "title": sentPosting.title, 
        "king": receive.postingWriter, 
        "members": sentPosting.members.length, 
        "priceType": sentHouse.priceType, 
        "priceFirst": sentHouse.priceFirst, 
        'priceMonth': sentHouse.priceMonth, 
        "maxmembers": sentHouse.roomNum, 
        "address": sentHouse.address,
        "imgUrl":sentHouse.imgUrl
      });
    }

    for (let receive of receivedApplies) {
      const sentPostingArray = await post.find({ "_id": new ObjectId(receive.postingId) }).toArray();
      
      if (sentPostingArray.length === 0) {
        console.error(`No posting found with id ${receive.postingId}`);
        continue;
      }
      
      const sentPosting = sentPostingArray[0];
      const sentHouse = (await house.find({ "id": receive.placeId }).toArray())[0];
      recieveResult.push({ 
        "state": receive.state,
        "title": sentPosting.title, 
        "king": receive.postingWriter, 
        "members": sentPosting.members.length, 
        "priceType": sentHouse.priceType, 
        "priceFirst": sentHouse.priceFirst, 
        'priceMonth': sentHouse.priceMonth,
        "maxmembers": sentHouse.roomNum, 
        "address": sentHouse.address ,
        "imgUrl":sentHouse.imageUrl,
        "id": receive._id.toString()
      });
    }

    const sentResult1 = sentResult.filter(item => item.state === 'accepted');
    const sentResult2 = sentResult.filter(item => item.state === 'waiting');
    const sentResult3 = sentResult.filter(item => item.state === 'denied');

    const recieveResult1 = recieveResult.filter(item => item.state === 'accepted');
    const recieveResult2 = recieveResult.filter(item => item.state === 'waiting');
    const recieveResult3 = recieveResult.filter(item => item.state === 'denied');

    res.json({ "sent": [sentResult1, sentResult2, sentResult3], "recieve": [recieveResult1, recieveResult2, recieveResult3] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
})

app.post('/api/getWishList', async(req, res) => {
  try {
          const userId = req.body.id;
          
          // Connect to the user collection
          const userCollection = client.db('User').collection('user');
          
          // Find the user with the given ID and retrieve their wishList
          const user = await userCollection.findOne({ id: userId });
          const wishList = user.wishList;
          
          // Connect to the house collection
          const houseCollection = client.db('House').collection('house');
          
          // Find the houses that match the IDs in the wishList
          const houses = await houseCollection.find({ id: { $in: wishList } }).toArray();
          
          // Send the list of houses as the response
          res.json(houses);
      } catch (error) {
          res.status(500).json({ error: error.toString() });
      }
  });

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

