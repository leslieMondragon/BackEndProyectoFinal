import { Router } from "express";
import UserVisible from "../dao/DTOs/userVisible.js";
// import passport from "passport";
//import UserModel from "../dao/models/user.js";

const router = Router()

router.get('/current', async (req, res)=> {
    req.session.user = req.user
    if (req.user) {
        let newUserNormalize = new UserVisible(req.user)
        res.status(200).send(newUserNormalize)
    }
    else{
        res.status(401).send({status: 'error', message: 'No existe sesion'})
    } 
})

export default router


