import express from "express"
const router = express.Router()

// import core routes
import coreRoutes from "../core/routes/"

// use core routes
router.use(coreRoutes)

export default router