
import express from "express";

import { findPackage } from "./handlers/findPackage";
import {  sendToQueue } from "../rmq/sendOrder";
import { generateOrderId } from "./handlers/generateOrderId";


export const router = express.Router();



router.post("/", async (req, res, next): Promise<any>  => {
    try {

      console.log(req.body);
      const orderBody: OrderType = extractOrder(req.body);
     
      const order = {} as OrderPayloadType;
     order.turn = generateOrderId(orderBody.id)

 
     
     if (orderBody.id==="3") {

      
      order.priority = 1
     }else{
   
      
      order.priority = 0
     }
     if (orderBody.phoneNumber) {
      order.package = await findPackage(orderBody.phoneNumber)
     }
     
     sendToQueue(order)
      
      
      return res.status(200).json({order})
    } catch (error) {

      res.send(error);
      console.log(error);
      
    }
  });
  


  export type OrderType = {

    id: string;
    phoneNumber?: string;
    
  
  }

  export type OrderPayloadType = {
    priority:number
    turn: string;
    package?: string;
  
  }

  
function extractOrder(body: any): OrderType {
  const { id, phoneNumber } = body;
  return { id, phoneNumber};
}
