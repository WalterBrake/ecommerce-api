import { Router } from "express";
const router = Router();

import { createShop, getShops } from "../controllers/shop.controller";

//-> api/Shops/
router.post("/", createShop);

router.get("/", getShops);

export default router;
