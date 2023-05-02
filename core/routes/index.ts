import express from "express"
const router = express.Router()

// import controllers
import mainController from "../controllers/main"
import authController from "../controllers/auth"

// import middlewares
import { protect } from "../middlewares/auth"

// main routes
router.get("/", mainController.index)

// auth routes
router.post("/auth/signup", authController.signup)
router.post("/auth/login", authController.login)
router.use("/auth", protect)
router.delete("/auth/logout", authController.logout)

export default router