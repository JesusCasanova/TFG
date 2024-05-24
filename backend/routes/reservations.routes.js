// Vendors
import express from "express";
// Controllers
import {
  create,
  readAll,
  readAllByUserId,
  readOne,
  remove,
  removeMultiple,
  update,
} from "../controllers/reservations.controller.js";
// Middleware
import checkAuth from "../middleware/checkAuth.middleware.js";

const router = express.Router();

router.get("/reservations", checkAuth, readAll);
router.get("/reservations/:id", checkAuth, readOne);
router.get("/reservations/user/:userId", checkAuth, readAllByUserId);
router.post("/reservations", checkAuth, create);
router.put("/reservations/:id", checkAuth, update);
router.delete("/reservations/:id", checkAuth, remove);
router.delete("/reservations", checkAuth, removeMultiple);

export default router;
