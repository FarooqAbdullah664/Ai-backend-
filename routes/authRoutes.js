import express from "express";
import { register, login } from "../Controllers/authControllers.js";
const router = express.Router();

// Handle OPTIONS requests for auth routes
router.options('/register', (req, res) => {
  res.status(200).send();
});

router.options('/login', (req, res) => {
  res.status(200).send();
});

router.post("/register", register);
router.post("/login", login);

export default router;
