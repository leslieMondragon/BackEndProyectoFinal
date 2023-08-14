import { Router } from "express";

const router = Router()

router.get('/set', (req, res)=>{
    res.cookie('Coderhouse', 'cookie', {maxAge: 10000000}).send('cookie seteada')
})

router.get('/get', (req, res)=>{
    res.send(req.signedCookies)
})

router.get('/setSigned', (req, res)=>{
    res.cookie('Coderhouse', 'cookie', {maxAge:100000, signed: true}).send('cookie firmada')
})

router.get('/delete', (req, res)=>{
    res.clearCookie('nombre').send('cookie borrada')
})

export default router
