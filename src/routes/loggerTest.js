import { Router } from "express";

const router = Router()

router.get('/', async (req, res)=>{
    req.logger.fatal("Fatal")
    req.logger.error("Error")
    req.logger.warning("Warning")
    req.logger.info("Info")
    req.logger.http("HTTP")
    req.logger.debug("Debug")
    res.send({message: "Prueba Logger"})
})

export default router;