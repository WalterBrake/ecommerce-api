import { Router } from "express";
const router = Router();

import { createProduct, getProducts } from "../controllers/product.controller";

//-> api/Products/
router.post("/", createProduct);

router.get("/", getProducts);

export default router;
