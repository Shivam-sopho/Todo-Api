var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose");
var {User} = require ("./models/user");
var {Todo} = require("./models/todo");

var app = express();

app.use(bodyParser.json());

app.post("/todo",(req,res)=>{
    var todo = new Todo({
        text : req.body.text,
        completed : req.body.completed,
        completedAt : req.body.completedAt
    });
    todo.save().then((docs)=>{
        res.send(docs);
    },(err)=>{
        res.status(400).send(err);
    });

});

app.get("/todo",(req,res)=>{
    Todo.find().then((todo)=>{
    res.send({todo});   
},(e)=>{
    res.status(400).send(e);
 });
});

app.listen(3000 , ()=>{
    console.log("Server started");
})
module.exports = {
    app
}
