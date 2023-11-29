import express from "express";
import { nanoid } from "nanoid";
import { client } from "../../mongodb.mjs";
import { ObjectId } from "mongodb";

const db = client.db("cruddb");
const col = db.collection("posts");

let router = express.Router()

// GET /api/v1/post/:userId/:postId
router.get("/post/:postId", async (req, res) => {
    if (!req.params.postId) {
        res.status(403).send("post id must be a valid id")
        return;
    }

    // if (isNaN(req.params.postId)) {
    //     res.send({ message: `post id must be a valid number, no alphabet is allowed in post id` })
    //     return;
    // }

    // MongoDb Query Operators Example:
    // const cursor = col.find({ price: { $not: { $gt: 77 } } })
    // const cursor = col.find({
    //     // $and: [
    //     //     { _id: req.params.postId },
    //     //     { title: "asdfgh" }
    //     // ]
    //     $or: [
    //             { _id: req.params.postId },
    //         { title: "something" }
    //     ]
    // })

    try {
        const results = await col.findOne({ _id: new ObjectId(req.params.postId) });
        res.send(results);
    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send("server error, please try later");
    }
})

// GET /api/v1/posts/:userId
router.get("/posts", async (req, res) => {
    const cursor = col.find({});
    try {
        let results = await cursor.toArray();
        // console.log("results", results)
        res.send(results)
    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.send("server error, please try again later");
    }
})

// POST /api/v1/post
router.post("/post", async (req, res) => {
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

    let newPost = {
        // _id: "48346932659432659743265" // database will issue this unique id itself
        id: nanoid(),
        title: req.body.title,
        text: req.body.text
    }
    try {

        const insertResponse = await col.insertOne(newPost);
        console.log("insertResponse", insertResponse);
        res.send({ message: "post created" })
    } catch (e) {
        console.log("error inserting mongodb: ", e)
        res.send("server error, please try again later")
    }
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
            res.send({ message: "post updated" })
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