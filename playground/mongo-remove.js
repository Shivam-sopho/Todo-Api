const {MongoClient,ObjectID} = require("mongodb");
//var s = new ObjectID();
//console.log(s);
MongoClient.connect('mongodb://localhost:27017/TodoApi',(err,db)=>{
    if(err){
        return console.log("Could not connect to the database");
    }
    console.log("Connected to the database");
//    db.collection("Users").deleteMany({name:"Shivam"}).then((result)=>{
//       console.log(result); 
//    });
     db.collection("Users").findOneAndDelete({_id: new ObjectID('59a0f4b25ddb3428e6deb49f')}).
     then((result)=>{
        console.log(result); 
    });

    db.close();
});
