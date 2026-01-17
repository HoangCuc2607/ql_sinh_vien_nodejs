import { Router } from "express";
import { SubjectController } from "./subject.controller";
import { requireRole } from "../../middlewares/role.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
router.use(authMiddleware); 

router.get("/", requireRole(['admin']), SubjectController.getAll);
router.get("/:id", requireRole(['admin']), SubjectController.getById);
router.post("/", requireRole(['admin']), SubjectController.create);
router.delete("/:id", requireRole(['admin']), SubjectController.delete);
export default router;