// Vendors
import express from "express";
// Controllers
import {
  create,
  readAll,
  readOne,
  remove,
  removeMultiple,
  update,
} from "../controllers/services.controller.js";
// Middleware
import checkAuth from "../middleware/checkAuth.middleware.js";

const router = express.Router();

router.get("/services", checkAuth, readAll);
router.get("/services/:word", checkAuth, readOne);
router.post("/services", checkAuth, create);
router.put("/services/:id", checkAuth, update);
router.delete("/services/:id", checkAuth, remove);
router.delete("/services", checkAuth, removeMultiple);

export default router;
