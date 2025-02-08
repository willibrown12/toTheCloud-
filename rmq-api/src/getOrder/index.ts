
import express  from "express";
import getMessage from "../rmq/getOrder";
import axios from "axios";
import dotenv from "dotenv"


export const router = express.Router();

dotenv.config();





router.get("/", async (req, res, next): Promise<any>  => {
  try {


   const queueData =await getMessage()
    

    
    return res.status(200).json({queueData})
  } catch (error) {

    res.send(error);
    console.log(error);
    
  }
});






  router.get("/stats", async (req, res): Promise<any>  => {
    const rabbitmqUrl = process.env.RABBIT_URL!
    const username = process.env.RABBIT_USER!
    const password = process.env.RABBIT_PASSWORD!
  
    try {
      const response = await axios.get(rabbitmqUrl, {
        auth: {
          username,
          password,
        },
      });
     

      return res.status(200).json(response.data)
  
     
    } catch (error ) {
    
      
      res.status(500).json(
        "Failed to fetch queue stats"
      );
    }
  });