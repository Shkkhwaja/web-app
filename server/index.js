import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userData from "./model/user.model.js";
import 'dotenv/config'


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGO_DB}`);

app.post("/login", (req, res) => {
    const { user, pass } = req.body;
    userData.findOne({ user: user }).then((users) => {
      if (users) {
        if (users.pass === pass) {
          res.json("Success");
        } else {
          res.json("the password is incorrect");
        }
      } else {
        res.json("no record existed");
      }
    });
  });

app.post("/register", (req, res) => {
  userData
    .create(req.body)
    .then((emp) => res.json(emp))
    .catch((err) => res.json(err));
});



app.get("/", (req, res) => {
  res.send("data");
});

app.listen(8000, () => {
  console.log("listen 8000");
});
