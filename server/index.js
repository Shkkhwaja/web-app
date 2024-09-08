import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import userData from "./model/user.model.js";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: 'https://web-app-front-lime.vercel.app',  
    credentials: true,               
}));

app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Login route
app.post("/login", async (req, res) => {
    const { user, pass } = req.body;
    try {
        const users = await userData.findOne({ user });
        if (users) {
            const isMatch = await bcrypt.compare(pass, users.pass);
            if (isMatch) {
                // Generate the JWT token
                const token = jwt.sign({ user }, process.env.JWT_SECRET || "secretkey", { expiresIn: '7h' });

                // Log the token to the console
                console.log("Generated Token:", token);

                // Set the token as a cookie with httpOnly and maxAge
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 7 * 60 * 60 * 1000,  // Cookie expires in 7 hours
                    sameSite: 'Lax',  // CSRF protection
                });

                return res.status(200).json({
                    status: 200,
                    message: "Login successful...",
                    token, 
                });
            } else {
                return res.status(401).json("The password is incorrect");
            }
        } else {
            return res.status(404).json("No record existed");
        }
    } catch (err) {
        res.status(500).json("An error occurred during login");
    }
});

// Middleware to verify token from cookies
function verifyToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token provided, please login." });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token, please login again." });
        }

        // Attach user information to request
        req.user = decoded;
        next();
    });
}

// New autologin route
app.get("/autologin", verifyToken, (req, res) => {
    // If the token is valid, send the user info back
    res.status(200).json({ status: 200, user: req.user.user });
});


// Register route
app.post("/register", (req, res) => {
    userData.create(req.body)
        .then(emp => res.json(emp))
        .catch(err => res.status(400).json(err));
});

// Test route
app.get("/", (req, res) => {
    res.send("Welcome to the backend");
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
