import { Router } from "express";
const router = Router();

import { createUser, getUsers } from "../controllers/user.controller.js";

//-> api/Users/
router.post("/", createUser);

router.get("/", getUsers);

export default router;
