import express from "express";
import fs from 'fs';
import SwaggerUi from "swagger-ui-express";
import authRouter from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV || "dev";

const app = express();

app.use(express.json());

if (MODE == "dev") {
    const swaggerDoc = JSON.parse(fs.readFileSync("./swagger-output.json", 'utf-8'));
    app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDoc));
}

app.get("/",(req, res) => {
    res.status(200).json("Hello World!")
})

app.use("/api/auth", authRouter)

app.use(errorHandler);

app.listen(3000, () => {
    console.log("app listening on port 3000");
})