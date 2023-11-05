const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const pollController = require("./pollController");

const app = express();

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/create", pollController.createPollGetController);
app.post("/create", pollController.createPollPostController);

app.get("/", (req, res) => {
  res.render("home");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/voteVerseDB")
  .then(() => {
    app.listen(4545, () => {
      console.log("Application is ready to server on port : 4545");
    });
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });
