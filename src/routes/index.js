import { Router } from "express";
import ProductRouter from "./products.js"
import CartRouter from "./carts.js"
import UserRouter from "./user.js"
import Auth from "./auth.js"
import SessionRouter from "./sessions.js"
import MockingRouter from "./mocking.js"
import UserTest from "./userTest.js"
import LoggerTest from "./loggerTest.js"

const router = Router()

router.use('/api/users', UserRouter)
router.use('/api/products', ProductRouter)
router.use('/api/carts', CartRouter)
router.use('/auth', Auth)
router.use('/api/sessions', SessionRouter)
router.use('/mockingproducts', MockingRouter)
router.use('/api/test/user', UserTest)
router.use('/loggerTest', LoggerTest)
export default router