import express from "express";
import { nanoid } from "nanoid";
// export const router = express.Router()
let router = express.Router()

const posts = [ // not recommended, server should be statelessF
    // {
    //     id: nanoid(),
    //     title: "My title",
    //     text: "some text"
    // }
]

// GET /api/v1/post/:userId/:postId
router.get("/post/:postId", (req, res) => {
    // if (isNaN(req.params.postId)) {
    //     res.send({ message: `post id must be a valid number, no alphabet is allowed in post id` })
    //     return;
    // }
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            res.send(posts[i])
            return;
        }
        // break;
    }
    res.send({ message: "post not found with id " + req.params.postId })
})

// GET /api/v1/posts/:userId
router.get("/posts/", (req, res) => {
    res.send(posts)
})

// POST /api/v1/post
router.post("/post", (req, res) => {
    if (!req.body.title
        || !req.body.text
    ) {
        res.status(403).send({
            message: `required parameter missing,
            example request body: 
            {
                id: 1234,
                title: "My title",
                text: "some text"
            } `}) // self documented api
        return;
    }
    posts.unshift({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text
    })

    res.send({ message: "post created" })
})

// PUT /api/v1/post/:userId/:postId
// {
//     title:"updated title",
//     text: "updated text"
// }
router.put("/post/:postId", (req, res) => {
    if (!req.params.postId
        || !req.body.title
        || !req.body.text
    ) {
        res.status(403).send({
            message: `example put body:
        {
            id: postId must be a valid id
            title: req.body.title,
            text: req.body.text
        }`
        })
        return;
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            posts[i] = {
                id: req.params.postId,
                title: req.body.title,
                text: req.body.text
            };
            // res.send({ message: "post updated with id " + req.params.postId })
            res.send({ message: "post updated"})
            return;
        }
    }
    res.send("post not found with this id " + req.params.postId)
})

// DELETE /api/v1/post/:userId/:postId
router.delete("/post/:postId", (req, res) => {
    if (!req.params.postId) {
        res.status(403).send({ message: "post id must be a valid id" })
        return;
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            posts.splice(i, 1)
            res.send({ message: "post deleted with id " + req.params.postId })
            return;
        }
    }
})

export default router;