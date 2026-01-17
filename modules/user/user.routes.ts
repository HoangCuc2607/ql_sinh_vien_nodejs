import { Router } from "express";
import { UserController } from "./user.controller";
import { requireRole } from "../../middlewares/role.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware); 

router.get("/", requireRole(['admin']), UserController.getAll);
router.get("/:id", requireRole(['admin']), UserController.getById);
router.post("/", requireRole(['admin']), UserController.create);
router.delete("/:id", requireRole(['admin']), UserController.delete);
export default router;