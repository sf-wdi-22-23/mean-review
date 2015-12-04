var express = require('express');
var Post = require('../models/post.js');

module.exports = function(app) {
  // INDEX 
  app.get('/api/posts', function(req, res){
    // INDEX - GET ALL POSTS
    Post.find().sort('-created_at').exec(function(err, posts) {
      if (err) { return res.status(404).send(err); }
      res.send(posts); 
    });    
  })

  // CREATE
  app.post('/api/posts', function(req,res){  
   // var post = new Post({ content: req.body.content });
   // post.save(function (err, post) {
    Post.create(req.body, function(err, post){
      if (err) { return res.send(err); }
      console.log(post);
      res.status(201).send(post);
    });
  });

  app.get('/api/posts/:post_id',function(req,res){   
    Post.findById(req.params.post_id, function(err, post) {
      if (err) { return res.status(404).send(err); }
      res.send(post); 
    });
  });

    // full update of one post by id
  app.put('/api/posts/:post_id', function(req,res){ 
    Post.findOneAndUpdate({ _id: req.params.post_id}, req.query.post, function (err, post) {
      if (err) { return res.send(err); }
      res.send(post);
    });
  })

    // delete one post by id
  app.delete('/api/posts/:post_id', function(req,res){   
    Post.findByIdAndRemove(req.params.post_id, function (err, post) {
      if (err) { return res.send(err); }
      res.status(200).send('Success');
    });
  });
}