import { NextFunction, Request, Response ,} from "express";
import jwt from "jsonwebtoken";
import getTokenFromHeaders from "./handlers/getTokenFromHeader";




export default function authenticate(req : Request, res: Response, next: NextFunction) {
  try {
    const token = getTokenFromHeaders(req);
   
    
    if (!token) throw new Error
    const decoded = jwt.verify(token, process.env.SECRET as string);
    if (decoded) {
     
      next();
    } else {
      throw new Error
    }
  } catch (error) {
   res.status(401).json({ message: "Unauthorized!"})
  }
   
  }

