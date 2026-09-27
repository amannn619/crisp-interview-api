import {Router} from "express";
import * as authcontroller from "../controllers/authController.js";

const router = Router();

router.post("/register", authcontroller.register);
router.post("/login", authcontroller.login);
router.get("/logout", authcontroller.logout);
router.get("/refresh", authcontroller.refresh);
router.get("/reload", authcontroller.reload)

export default router;