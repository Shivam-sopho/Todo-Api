const {MongoClient,ObjectID} = require("mongodb");
//var s = new ObjectID();
//console.log(s);
MongoClient.connect('mongodb://localhost:27017/TodoApi',(err,db)=>{
    if(err){
        return console.log("Could not connect to the database");
    }
    console.log("Connected to the database");
    
    db.collection("Users").find({name:"Shivam"}).toArray().then((docs)=>{
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    },(err )=>{
        console.log("not connected to the database")
    })
    db.collection("Users").find({name:"Shivam"}).count().then((count)=>{
        console.log('count:-');
        console.log(count);
    },(err )=>{
        console.log("not connected to the database")
    })
       db.close();
    });
