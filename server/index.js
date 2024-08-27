import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import userData from "./model/user.model.js";
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post("/login", async (req, res) => {
    const { user, pass } = req.body;
    try {
        const users = await userData.findOne({ user });
        if (users) {
            const isMatch = await bcrypt.compare(pass, users.pass);
            if (isMatch) {
                res.json("Success");
            } else {
                res.json("The password is incorrect");
            }
        } else {
            res.json("No record existed");
        }
    } catch (err) {
        res.status(500).json("An error occurred during login");
    }
});

app.post("/register", (req, res) => {
    userData.create(req.body)
        .then(emp => res.json(emp))
        .catch(err => res.status(400).json(err));
});

app.get("/", (req, res) => {
    res.send("data");
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
