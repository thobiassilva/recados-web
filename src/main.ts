import express from "express";

let app = express();
app.use(express.json());
app.use(express.static(__dirname + "/../public"));

app.listen(process.env.PORT || 8081, () => console.log("Server ON"));
