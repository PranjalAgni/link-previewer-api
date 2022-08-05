import { Router, Request, Response } from "express";
import { query, validationResult } from "express-validator";
import { scrapePage } from "../../services/scrape";

const router = Router();

router.get("/", [query("url").isURL()], async (req: Request, res: Response) => {
  try {
    console.log("Target url ", req.query.url);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const data = await scrapePage(req.query.url as string);

    return res.json({
      message: "Result from url preview",
      ...data
    });
  } catch (error) {
    return res.status(500).json({
      errors: [error.message]
    });
  }
});

export default router;
