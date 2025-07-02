import express, { type Request, type Response } from "express";
import { router as healthcheck } from "./routes/test";
import { router as productRouter} from "./routes/product.router"

const app = express();

app.use("/healthcheck", healthcheck);
app.use("/products", productRouter)

export default app;
