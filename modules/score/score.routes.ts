import e, { Router } from "express";
import { ScoreController } from "./score.controller";
import { requireRole } from "../../middlewares/role.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const router = Router();

router.use(authMiddleware); 

router.get("/", requireRole(['admin']), ScoreController.getAll);
router.get("/:id", requireRole(['admin']), ScoreController.getById);
router.post("/", requireRole(['admin']), ScoreController.create);
router.delete("/:id", requireRole(['admin']), ScoreController.delete);

export default router;