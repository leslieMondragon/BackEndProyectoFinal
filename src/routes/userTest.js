import { Router } from "express";
import {faker} from "@faker-js/faker";

const router = Router();
faker.locale = 'en';

router.get("/", async (req, res)=>{
    let first_name = faker.name.firstName();
    let last_name = faker.name.lastName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    res.send({first_name,last_name,email,password})
});

export default router;
