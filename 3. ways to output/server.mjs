import express from "express";
// import cors from "cors";
import path from "path";

const __dirname = path.resolve();
const app = express();
app.use(express.json()) // body parser
// app.use(cors());

// app.get("/", (req, res) => {
//     console.log("Hello world!", new Date())
//     res.send("Hello world! " + new Date())
// })

app.get("/profile", (req, res) => {
    console.log("this is profle", new Date())
    res.send("This is profle! " + new Date())
})

// app.get("/getHtmlFile", (req, res) => {
//     res.sendfile("./public/vscode_mac.zip")
// })
app.post("/weather", (req, res) => {
    res.send({
        msg: "weather is normal",
        temp: 30,
        min: 20
    })
})

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/', express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
});