const {MongoClient,ObjectID} = require("mongodb");
//var s = new ObjectID();
//console.log(s);
MongoClient.connect('mongodb://localhost:27017/TodoApi',(err,db)=>{
    if(err){
        return console.log("Could not connect to the database");
    }
    console.log("Connected to the database");
    db.collection("Users").findOneAndUpdate({name : "Shivam"},{
        $set: {
            name : "Shivam12"
        }
        ,
        $inc:{
            age : -1
        }
    },{returnOriginal : false}).then((result)=>{
        console.log(result);
   });
    db.close();   
    
});
