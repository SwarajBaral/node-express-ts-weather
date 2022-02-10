import { Request, Response } from "express";
import weatherService from "../Services/weatherService";

class weatherController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await weatherService.getAll();
      if (!data.success) {
        throw data;
      }
      return res.status(200).json({ ...data, user: res.locals.user });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getLocationWeather(req: Request, res: Response) {
    try {
      const location = req.params.name;
      const data = await weatherService.locWeather(location);
      if (!data.success && data.error === "Inavlid City") {
        return res.status(404).json(data);
      }
      if (!data.success) {
        throw data;
      }
      return res.status(200).json({ ...data, user: res.locals.user });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateLocationWeather(req: Request, res: Response) {
    try {
      const locationId: any = req.params.id;
      const locationDeets = req.body;
      const updateStatus = await weatherService.updateWeather(
        locationId,
        locationDeets
      );
      if (!updateStatus.success) {
        throw updateStatus;
      }
      return res.status(200).send({ ...updateStatus, user: res.locals.user });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new weatherController();
