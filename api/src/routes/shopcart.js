import { Router } from "express";
const router = Router();

import { createShopcart, getShopcarts } from "../controllers/shopcart.controller";

//-> api/Shopcarts/
router.post("/", createShopcart);

router.get("/", getShopcarts);

export default router;
