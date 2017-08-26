const {MongoClient,ObjectID} = require("mongodb");
var s = new ObjectID();
console.log(s);
MongoClient.connect('mongodb://localhost:27017/TodoApi',(err,db)=>{
    if(err){
        return console.log("Could not connect to the database");
    }
    console.log("Connected to the database");
    db.collection('Users').insertOne({
        name : "Shivam",
        age : 21,
        location : "Bihar , india"
    },(err,result)=>{
        if(err){
            return console.log("Date could not be inserted");
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    })
     db.collection('Todos').insertOne({
        text : "Doing a project",
        complete : false
    },(err,result)=>{
        if(err){
            return console.log("Date could not be inserted");
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    })
    db.close();
});
