import express from "express";
import { router as healthcheck } from "./routes/test";
import productRouter from "./routes/product.router"
import userRouter from "./routes/user.router"
import authRouter from "./routes/auth.router"
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/healthcheck", healthcheck);
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)

app.use(errorHandler)

export default app;
