import express from "express";
// export const router = express.Router()
let router = express.Router()


router.post("/login", (req, res) => {
    console.log("this is loginv v1", new Date())
    res.send("This is loginv v1! " + new Date())
})

router.post("/signup", (req, res) => {
    console.log("this is signup v1", new Date())
    res.send("This is signup v1! " + new Date())
})

export default router;
