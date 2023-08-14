import { Router } from "express";
import auth from "../middleware/authorization.js";
import UserController from "../controllers/user.js";

const router = Router();

const userController = new UserController();

router.get('/view', auth("admin"), userController.getView)
router.post('/view', auth("admin"), userController.searchUser)
router.get('/', auth("admin"), userController.getUsers)
router.delete('/delete/:uid', auth("admin"), userController.deleteUser)
router.get('/delete', auth("admin"), userController.deleteUsers)
router.get("/premium/:uid", auth("admin"), userController.changeRoleUser);

export default router;