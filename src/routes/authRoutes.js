import {Router} from "express";
import * as authcontroller from "../controllers/authController.js";
import requestSchemaHandler from "../middlewares/requestSchemaHandler.js";
import { loginSchema, registerSchema } from "../utils/schema.js";
import authHandler from "../middlewares/authHandler.js";

const router = Router();

router.post("/register", requestSchemaHandler(registerSchema), authcontroller.register);
router.post("/login", requestSchemaHandler(loginSchema), authcontroller.login);
router.get("/logout", authHandler, authcontroller.logout);
router.get("/refresh", authcontroller.refresh);
router.get("/reload", authHandler, authcontroller.reload)

export default router;