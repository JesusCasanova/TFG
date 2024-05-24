// Vendors
import express from "express";
// Controllers
import { readAll } from "../controllers/users.controller.js";
// Middleware
import checkAuth from "../middleware/checkAuth.middleware.js";

const router = express.Router();

router.get("/users", checkAuth, readAll);

export default router;
