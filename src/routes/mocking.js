import { Router } from "express";
import auth from "../middleware/auth.js";
import { generateProduct } from "../utils/mocking.js";

const router = Router();

router.get("/", auth("session"), async (req, res)=>{
    let prods = []
    for (let index = 0; index < 100; index++) {
        prods.push(generateProduct())
    }
    res.send({status:"success", payload:prods})
});

export default router;
