import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const app = express();
import { router as loginRouter } from "./login/index"
import { router as sendOrderRouter } from "./sendOrder/index"
import { router as getOrderRouter } from "./getOrder/index"
import bodyParser from "body-parser";
import authenticate from "./middleware/authenticate";

app.use(bodyParser.json())
app.use(cors())


app.get("/health-check", (req, res, next) => {
    res.status(200).send("Api is working!")
})


app.use("/sendOrder", sendOrderRouter)
app.use("/login", loginRouter)

app.use(authenticate);
app.use("/getOrder", getOrderRouter)

app.use((error: any, req: any, res: any, next: any) => {
    res.status(409).send("Something went Wrong")
})



app.listen(process.env.PORT)