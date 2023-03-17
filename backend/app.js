const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const Post = require("./models/post");
const app = express();

mongoose.connect("mongodb+srv://paolo:EnOFvnmE6vPl8Jww@cluster0.ny960jb.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Connected to Mongo!")
    })
    .catch((err)=>{
        console.log( err)
    })

app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-request-with, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next();
})

app.post('/api/posts',(req, res, next)=>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(
    res.status(201).json({
        message: "Post added Successfully",
        postId: post._id
    }));
})


app.get('/api/posts',(req, res, next)=>{
    Post.find()
        .then(documents =>{
            res.status(200).json({
                message: 'Posts fetched Successfully',
                posts: documents
            })
        })
    
})

app.delete("/api/posts/:id", (req, res, next)=>{
    Post.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result)
        res.status(200).json({ message: "Post Deleted!"});
    })
    
});



app.use((req, res, next)=>{
    res.send('nada')
})



module.exports = app;
// Q2qDQDVYfIvZ2LQX