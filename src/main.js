import express from "express";

const app = express();

app.use(express.json());

app.get("/",(req, res) => {
    res.status(200).json("Hello World!")
})

app.listen(3000, () => {
    console.log("app listening on port 3000");
})