// const db = require("./mysqlmanager");

import WeatherPost from "../Interface/weatherPost";
import IUser from "../Interface/userInterface";
import { db } from "./mysqlmanager";

class DbService {
  //Get all data from weather table
  async getAllWeather() {
    const data = await db.query("SELECT * FROM weather");
    return data;
  }

  //Get single location's weather data
  async checkLocationExists(locationId: Number) {
    const data = await db.query("SELECT * FROM weather where id = ?", [
      locationId,
    ]);
    return data;
  }

  //Get single location's weather data
  async getSingleWeather(location: String) {
    const data = await db.query("SELECT * FROM weather where name = ?", [
      location,
    ]);
    return data;
  }

  //Insert a sinlge locations's weather data into table
  async insertSingleWeather(locWeatherDetails: WeatherPost) {
    const { name, id, main } = locWeatherDetails;

    const status = await db.execute(
      `INSERT 
        INTO weather (name, owm_id, temp, pressure)
        VALUES (?, ?, ?, ?)
        `,
      [name, id, main.temp, main.pressure]
    );
    return status;
  }

  async updateLocationWeather(
    locationId: Number,
    locWeatherDetails: WeatherPost
  ) {
    const { name, temp, pressure } = locWeatherDetails;

    const status = await db.execute(
      `UPDATE weather
        SET name = ?, temp = ?, pressure = ?
        WHERE id = ?`,
      [name, temp, pressure, locationId]
    );
    return status;
  }

  // Auth services

  async addUser(user: IUser, hashedPass: string, id: number) {
    const { name, username, email, role } = user;
    console.log(id);
    const status = await db.execute(
      `INSERT
        INTO users (id, name, username, email, role, password)
        VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, username, email, role, hashedPass]
    );
    return status;
  }
  async getUser(email: string) {
    console.log(email);
    const user = await db.execute(
      `SELECT *
          FROM users
          WHERE email = ?`,
      [email]
    );
    return user;
  }
}

export const MySQLService = new DbService();
