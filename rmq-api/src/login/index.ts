import express, { Request, Response } from "express"
import { loginUser, } from "./handlers/loginUser"
import jwt from "jsonwebtoken";

import { getUserData } from "./handlers/getUserData";

import authenticate from "../middleware/authenticate";







const router = express.Router()

router.post("/", async (req: Request, res: Response, next): Promise<any> => {
    try {
        const newUser: loginType = extractLogin(req.body);
        const result = await loginUser(req.body)
       
        if (result.authentication === false) {
          
            return res.status(401).json({ message: "email or passwords are incorrect" })
          
            
        } else {

            console.log(process.env.SECRET as string);
            console.log( result);
            
            const token = jwt.sign({ role: result.role, idUser: result.id }, process.env.SECRET as string, {
                expiresIn: '1h',
            });
           
            return res.status(200).json({ message: "user logged In successfully!", token, idUser: result.id })
        }
    } catch (error: any) {
        console.log("error");
        
        return res.status(400).json({ error: "something went wrong" })
    }
})



router.get("/:id", authenticate, async (req, res, next) => {
    try {
        const result: any = await getUserData(+req.params.id);
        res.json({ user: result[0] });
    } catch (error) {
        console.log(error)
        res.send("Something went wrong");
    }
})






export type loginType = {
    email: string;
    password: string;
}


function extractLogin(body: any): loginType {
    const { email, password } = body;
    return { email, password };
}





export { router }

