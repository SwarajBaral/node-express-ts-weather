import express, { Router } from "express";
import { schema as weatherPostSchema } from "../Schema/weatherSchema";
import { validateRequest as validateWeatherRequest } from "../Middlewares/validateRequest";
import weatherController from "../Controllers/weatherController";

export const weatherRouter: Router = express.Router();

weatherRouter.get("/all", weatherController.getAll);

weatherRouter.get("/:name", weatherController.getLocationWeather);

weatherRouter.post(
  "/:id",
  weatherPostSchema,
  validateWeatherRequest,
  weatherController.updateLocationWeather
);
