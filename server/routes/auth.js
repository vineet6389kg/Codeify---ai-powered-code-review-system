import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const userResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email: String(email).toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      token: signToken(user._id),
      user: userResponse(user),
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)[0].message;
      return res.status(400).json({ message });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({
      email: String(email).toLowerCase(),
    }).select("+password");

    // same message for both cases, so attackers can't tell which emails exist
    if (!user || !(await user.comparePassword(String(password)))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      token: signToken(user._id),
      user: userResponse(user),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/auth/me  (protected: returns the logged-in user)
router.get("/me", protect, (req, res) => {
  res.json({ user: userResponse(req.user) });
});

export default router;