import express from "express";
import { router as healthcheck } from "./routes/test";
import { router as productRouter} from "./routes/product.router"
import { errorHandlerMiddleware as errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/healthcheck", healthcheck);
app.use("/api", productRouter)

app.use(errorHandler)

export default app;
