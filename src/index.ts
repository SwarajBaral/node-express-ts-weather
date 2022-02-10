import * as dotenv from "dotenv";
import express, { Request, Response, Express } from "express";
import { weatherRouter } from "./Routes/weatherRoutes";
import jwt, { Secret } from "jsonwebtoken";
import { authorize } from "./Middlewares/auth";
import authRouter from "./Routes/authRoutes";

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use("/api/weather", authorize, weatherRouter);
app.use("/auth", authRouter);

app.get("/", async (req: Request, res: Response) => {
  res.json({
    message: "Server is running",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`);
});

/* TODO:
  1. Express middleware, Express validators (implement it)
  2. After validators, Refactor code into typescript.
  3. Webhooks
  4. Messaging Queue
  5. jwt
  
*/
