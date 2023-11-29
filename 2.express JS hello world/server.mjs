console.log("this is express JS hello world")

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

// http://localhost:3000/weather/karachi?unit=metric&side=west&age=23

app.get("/weather/:cityName", (req, res) => {
    console.log("this is weather Api", new Date())

    console.log("req.params.cityName: ", req.params.cityName)

    console.log("req.query.unit: ", req.query.unit)
    console.log("req.query.side: ", req.query.side)
    console.log("req.query.age: ", req.query.age)

    let weatherData = {
        karachi: {
            city: "Karachi",
            tempInC: 30,
            humidity: 56,
            high: 32,
            low: 18
        },
        london: {
            city: "London",
            tempInC: 20,
            humidity: 56,
            high: 32,
            low: 18
        },
    }

    let userCityInput = req.params.cityName.toLowerCase();
    console.log(userCityInput)

    let weatherDataToSend = weatherData[userCityInput]
    if (weatherDataToSend) {
        res.send(weatherDataToSend)
    } else {
        res.status(404)
            .send(`weather data is not available for ${req.params.cityName}`);
    }
})

let comments = []
app.post("/comment/:name", (req, res, next) => {
    const name = req.params.name;
    const comment = req.body.comment;
    // console.log(req.body)

    comments.push({
        name: name,
        comment: comment
    })
    res.send({ msg: "Comment posted successfully!" })
})

app.get("/comments", (req, res, next) => {
    res.send(comments)
})

app.use('/', express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
});