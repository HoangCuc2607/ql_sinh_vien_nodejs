import { Router } from "express";
import { ClassController } from "./class.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
console.log('requireRole =', requireRole)

const router = Router();

router.use(authMiddleware); 

router.get("/", requireRole(['admin']), ClassController.getAll);
router.get("/:id", requireRole(['admin']), ClassController.getById);
router.post("/", requireRole(['admin']), ClassController.create);
router.delete("/:id", requireRole(['admin']), ClassController.delete);
export default router;