import express from "express"
import { createTeam, getTeamById } from "../controllers/TeamController.js";

const router = express.Router();

router.post("/", createTeam);
router.get("/:teamId", getTeamById);

export default router; 