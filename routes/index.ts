import express from "express"
const router = express.Router()

// import core routes
import coreRoutes from "../core/routes/"

// use core routes
router.use(coreRoutes)

// use module
import module from "../modules"
router.use(module.router)

export default router