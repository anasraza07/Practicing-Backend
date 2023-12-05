import express from "express";
// export const router = express.Router()
let router = express.Router()
import { client } from "../../mongodb.mjs";
const userCollection = client.db("cruddb").collection("users")
import { stringToHash, verifyHash, validateHash } from "bcrypt-inzi";

router.post("/login", async (req, res) => {
    if (!req.body?.email
        || !req.body?.email) {
        res.send(`required parameter missing, example request body:
            {
                email:some email,
                password:some password
        }`)
        return;
    }

    try {
        const result = await userCollection.findOne({ email: req.body.email })
        console.log("result: ", result)

        if (!result) {
            res.status(403).send({
                message: "email or password is incorrect"
            })
        } else {

            if (req.body.password === result.password) {
                res.send({ message: "Login successful" })
            } else {
                res.send({ message: "email or password is incorrect" })
            }
        }

    } catch (e) {
        res.send("server error, please try later")
    }

})

router.post("/signup", async (req, res) => {
    if (!req.body?.firstName
        || !req.body?.lastName
        || !req.body?.email
        || !req.body?.password) {
        res.send(`required parameter missing, example request body:
            {
                firsName: some firsName,
                lastName: some lastName,
                email: some@email.com,
                password: some$password
        }`)
        return;
    }

    req.body.email = req.body.email.toLowerCase();

    try {
        const result = await userCollection.findOne({ email: req.body.email })
        console.log("result: ", result)
        if (!result) { // user not found

            const passwordHash = stringToHash(req.body.password)

            const insertResponse = await userCollection.insertOne({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: passwordHash
            })
            console.log("insertResponse: ", insertResponse)
            res.send({ message: "Signup successful" });

        } else { // user already exist
            res.status(403).send({
                message: "user already exist with this email"
            });
        }
    } catch (e) {
        console.log("error inserting mongodb: ", e)
        res.status(500).send("server error, please try later")
    }
})

export default router;
