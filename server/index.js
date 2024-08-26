import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userData from "./model/user.model.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors({
  origin: 'https://web-app-front-swart.vercel.app', // Your frontend URL
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

app.post("/login", (req, res) => {
  const { user, pass } = req.body;
  userData.findOne({ user: user }).then((users) => {
    if (users) {
      if (users.pass === pass) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  }).catch(err => {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  });
});

app.post("/register", (req, res) => {
  userData.create(req.body)
    .then((emp) => res.status(201).json({ message: "Registration successful", user: emp }))
    .catch((err) => {
      console.error('Error during registration:', err);
      
      if (err.name === 'ValidationError') {
        res.status(400).json({ error: 'Validation error. Please check your input.' });
      } else if (err.code === 11000) { // Duplicate key error for unique fields
        res.status(400).json({ error: 'User already exists. Please choose a different username or email.' });
      } else {
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
      }
    });
});

app.get("/", (req, res) => {
  res.send("Backend API is working");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
