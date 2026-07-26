import { admin, employee, manager } from '@/controllers/user.controller';
import express from 'express'


import { verifyToken } from '../middleware/auth.middleware'
import { authorizeRoles } from '@/middleware/role.middleware';


const router = express.Router();


router.post('/admin', verifyToken, authorizeRoles('admin'), admin)
router.post('/manager', verifyToken, authorizeRoles('admin','manager'), manager)
router.post('/employee', verifyToken, authorizeRoles('admin', 'manager', 'employee'), employee)


export default router;