import express from "express"
const router = express.Router()

// import core routes
import coreRoutes from "../core/routes/"

// use core routes
router.use(coreRoutes)

// use module
//
// Products:
// import { routes as productRoutes } from "../modules/products"
// router.use("/product", productRoutes)
//
// Articles:
// import { routes as articleRoutes } from "../modules/articles"
// router.use("/articles", articleRoutes)

export default router