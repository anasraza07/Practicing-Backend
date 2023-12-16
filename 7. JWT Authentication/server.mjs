import express from "express";
import path from "path";
// import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config'
const __dirname = path.resolve();

import apiv1Router from "./apiv1/index.mjs"
import apiv2Router from "./apiv2/index.mjs"

const app = express();
app.use(express.json()) // body parser
app.use(cookieParser()) // cookie parser
// app.use(cors());

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/', express.static(path.join(__dirname, 'public')))

app.use("/api/v1", apiv1Router) // nested mini routes
app.use("/api/v2", apiv2Router) // nested mini routes


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
});