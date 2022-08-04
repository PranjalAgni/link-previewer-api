import { Router } from "express";
import previewRouter from "./routes/preview";

const router = Router();

// Initalize routes
router.use("/preview", previewRouter);

export default router;
