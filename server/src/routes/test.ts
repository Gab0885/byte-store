import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("A aplicação está funcionando!");
});

export { router };
