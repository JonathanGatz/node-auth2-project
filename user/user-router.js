const express = require('express');
const router = express.Router();
const Users = require("./userDb")
const Posts = require("../posts/postDb")



router.post('/', (req, res) => {

Users.insert({name: req.body.name})
.then(result => {
    res.status(201).json(result)
})
.catch(err => {
    console.log(err)
    res.status(500).json({message: "Check your user id"})
})
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

    const newPost = req.body
    Posts.insert({...newPost, user_id:req.user.id})
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/:id', validateUserId, (req, res) => {

    Users.getById(req.param.id)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "Uh no, where is your data?"})
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {

    Users.getUserPosts(req.params.id)
    .then(posts => {
        res.status(201).json(posts)
    })
});

router.delete('/:id', validateUserId, (req, res) => {

    Users.getUserPosts(req.params.id)
    .then(user => {
        res.status(204).json(user)
    })
    .catch(err => {
        console.log(err)
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {

    const changes = req.body
    Users.update(req.params.id, changes)
    .then(updated => {
    res.status(200).json(updated)
    })
    .catch(err => {
    console.log(err)
    })
})



function validateUserId(req, res, next) {

Users.getById(req.params.id)
.then(resource => {
    if (resource){
    req.user = resource;
    next();
    } else {
    res.status(400).json({message: "Wrong user id"})
    }
})
.catch(err => {
    console.log(err)
})
}

function validateUser(req, res, next) {

const body = req.body
const name = req.body.name

if(!body){
    res.status(400).json({message: "Empty post data"})
} else if (name){
    res.status(400).json({message: "Please enter text"})
} else {
    next()
}
}

function validatePost(req, res, next) {

const body = req.body
const text = req.body.text

if (body){
    res.status(400).json({message:"Where is your post?"})
} else if (text){
    res.status(400).json({message:"Please enter text"})
} else {
    next()
}
}

module.exports = router;