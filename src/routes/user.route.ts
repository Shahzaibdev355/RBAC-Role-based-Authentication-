import { admin, employee, manager } from '@/controllers/user.controller';
import express from 'express'

import { verifyToken } from '../middleware/auth.middleware'

const router = express.Router();


router.post('/admin', verifyToken, admin)
router.post('/manager', verifyToken, manager)
router.post('/employee', verifyToken, employee)


export default router;