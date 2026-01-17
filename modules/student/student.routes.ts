import { Router } from 'express'
import { StudentController } from './student.controller'
import { requireRole } from '../../middlewares/role.middleware'
import { authMiddleware } from '../../middlewares/auth.middleware'
const router = Router()
router.use(authMiddleware); 
router.get('/', requireRole(['admin']), StudentController.getAll)
router.get('/:id', requireRole(['admin']), StudentController.getById)
router.post('/', requireRole(['admin']), StudentController.create)
router.delete('/:id', requireRole(['admin']), StudentController.delete)

export default router
