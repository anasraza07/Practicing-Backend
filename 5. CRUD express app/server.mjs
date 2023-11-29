import express from "express";
import path from "path";
// import cors from "cors";
import mongodb from "mongodb";

const __dirname = path.resolve();

import apiv1Router from "./apiv1/index.mjs"
import apiv2Router from "./apiv2/index.mjs"

import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://dbuser:dbpassword@cluster0.tfkmujs.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect(); // to connect database

const app = express();
app.use(express.json()) // body parser
// app.use(cors());

app.use("/api/v1", apiv1Router) // nested mini routes
app.use("/api/v2", apiv2Router) // nested mini routes

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/', express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
});