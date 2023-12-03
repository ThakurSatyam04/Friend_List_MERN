import express from "express"
import { createUser, deleteUser, domainGender, getAllUser, getUser, updateUser } from "../controllers/UserController.js";

const router = express.Router();

router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/user/:id", getUser);
router.get("/user", getAllUser);
router.get("/user/filter", domainGender);

export default router;