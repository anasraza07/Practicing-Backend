import express from "express";
let router = express.Router();

import authRouter from "./routes/auth.mjs"
import postRouter from "./routes/post.mjs"
import commentRouter from "./routes/comment.mjs"
import feedRouter from "./routes/feed.mjs"

router.use(authRouter)

router.use((req, res, next) => { // JWT
    const token = "valid";
    if (token === "valid") {
        next();
    }
    else {
        res.status(401).send(
            { message: "Invalid token" }
        )
    }
})

router.use(postRouter) // Secure apis

router.post("/api/v1/weather", (req, res) => {
    res.send({
        apiVersion: "v1",
        msg: "weather is normal",
        temp: 30,
        min: 20
    })
})

export default router;

