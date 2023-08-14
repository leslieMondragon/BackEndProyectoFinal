import { Router } from 'express'
import CartController from '../controllers/cart.js';
import authorization from "../middleware/authorization.js";
import auth from '../middleware/auth.js';

const router = Router()
const cartController = new CartController();

router.get('/view', auth("session") ,cartController.getView)

router.post('/:pid', auth("session"), cartController.addProduct)

router.put('/:pid', auth("session"), cartController.addProductQuantity)

router.put('/', auth("session"), cartController.addProducts)

router.delete('/:pid',auth("session"), cartController.deleteProduct)

router.delete('/', authorization("user"), cartController.deleteCart)

router.get('/purchase', auth("session") ,cartController.finishProcess)

export default router