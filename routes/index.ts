import express from "express"
const router = express.Router()

// import core routes
import coreRoutes from "../core/routes/"

// import module routes
import { routes as productRoutes } from "../modules/products"

// use core routes
router.use(coreRoutes)

// use module routes
router.use("/product", productRoutes)

export default router