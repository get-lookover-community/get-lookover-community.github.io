var express = require('express');
var http = require('http');
var fs = require('fs');
var router = express.Router();

/* GET Home page. */
router.get('/', function(req, res, next) {
  res.render('template/index', { 
    title: 'Home Page'
  });
});

/* GET Articles */
router.get('/articles', function(req, res, next) {
  res.render('template/articles', { 
    title: 'Articles'
  });
});

/* GET Admins */
router.get('/admins', function(req, res, next) {
  res.render('admins/admin', { 
    title: 'Admins'
  });
});
/* GET Admins */
router.get('/admins/allposts', function(req, res, next) {
  res.render('admins/allposts', { 
    title: 'Admins All posts'
  });
});

/* GET Specific id */
router.get('/articles/:id', function(req, res, next) {
  var posts = fs.readFileSync('./data/article.json');
  var data = JSON.parse(posts);
  let post = data.find(e => e.id === req.params.id);
  let show_post = (({id, title, content}) => ({id, title, content}))(post);
  res.render('template/post', { 
    id: show_post.id,
    title: show_post.title,
    content: show_post.content
  });
});

router.get('/add_articles/:id/:title/:content', function(req, res, next) {
  var posts = fs.readFileSync('./data/article.json');
  var data = JSON.parse(posts);

  var add_post = {
      id : req.params.id,
      title : req.params.title,
      content : req.params.content
  }
  data.unshift(add_post);
  var jsonposts = JSON.stringify(data, null, 2);
  fs.writeFile('./data/article.json', jsonposts, finished);
  function finished(e){
      console.log('All set !!!');
  }
  res.send(`<p>Post <h1>${req.params.id}</h1> Added</p> <br> <a href="/">Return to home page</a>`);
});

router.get('/article/update/:id/:title/:content', function(req, res, next) {
  var posts = fs.readFileSync('./data/article.json');
  var data = JSON.parse(posts);
  for (let [i, e] of data.entries()) {
    if (e.id === req.params.id) {
      e.title = req.params.title,
      e.content = req.params.content
    }
  }
  var jsonposts = JSON.stringify(data, null, 2);
  fs.writeFile('./data/article.json', jsonposts, finished);
  function finished(e){
    console.log('Post deleted !!!');
  }
  res.send(`<p>Post with id <h1>${req.params.id}</h1> deleted</p> <br> <a href="/">Return to home page</a>`);
});

router.get('/article/update/:id/', function(req, res, next) {
  var posts = fs.readFileSync('./data/article.json');
  var data = JSON.parse(posts);
  for (let [i, e] of data.entries()) {
    if (e.id === req.params.id) {
      data.splice(i, 1);
    }
  }
  var jsonposts = JSON.stringify(data, null, 2);
  fs.writeFile('./data/article.json', jsonposts, finished);
  function finished(e){
    console.log('Post Updated !!!');
  }
  res.send(`<p>Post with id <h1>${req.params.id}</h1> Updated</p> <br> <a href="/">Return to home page</a>`);
});

module.exports = router;
