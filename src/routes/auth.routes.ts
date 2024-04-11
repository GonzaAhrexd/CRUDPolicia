import { Router } from 'express'
import {login, register, logout, profile} from '../controllers/auth.controller'
import { authRequired, authAdmin } from '../middlewares/validateToken'
import { validateSchema } from '../middlewares/validator.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema'

const router:Router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/profile', authRequired, authAdmin , profile)
export default router