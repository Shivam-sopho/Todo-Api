//require("./config/config");

var express = require("express");
var bodyParser = require("body-parser");
var {ObjectID} = require("mongodb");
var _ = require("lodash");

var {mongoose} = require("./db/mongoose");
var {User} = require ("./models/user");
var {Todo} = require("./models/todo");

var app = express();
var port = process.env.PORT || 3000;
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
app.get("/todo/:id",(req,res)=>{
   id = req.params.id;
   if(!ObjectID.isValid(id))
   {
       return res.status(404).send();
   }
   Todo.findById(id).then((todo)=>{
       if(!todo){
        return res.status(400).send();
       }
       res.send({todo});
   },(err)=>{
       res.status(400).send();
   })
    
});
app.delete("/todo/:id" ,(req,res)=>{
   var id = req.params.id;
   if(!ObjectID.isValid(id)) {
       return res.status(404).send();
   }
   Todo.findByIdAndRemove(id).then((todo)=>{
       if(!todo){
           return res.status(400).send();
       }
       res.send({todo});
   },(err)=>{
       res.status(400).send();
   });
   
});
app.patch("/todo/:id", (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);
            if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
            if (body.completed==true) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }
            Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
                    res.send({todo});
        }).catch((e) => {
            res.status(400).send();
        });
    });
app.listen(port , ()=>{
    console.log(`Server started on ${port}`);
})
module.exports = {
    app
}
