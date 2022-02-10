import { MySQLService } from "../Data/mysqldatacontroller";
import WeatherPost from "../Interface/weatherPost";
import { getAirData, getWeatherData } from "./apiservice";

class weatherService {
  database;
  constructor(database: any) {
    this.database = database;
  }

  // Get /all route
  async getAll() {
    try {
      const allData = await this.database.getAllWeather();
      return { success: true, body: allData };
    } catch (error) {
      return { success: false, error: (error as Error).stack };
    }
  }

  //Get /location route
  async locWeather(location: String) {
    try {
      const data = await this.database.getSingleWeather(location);

      //If data doesn't exist in the DB, create an entry from API
      if (data.length === 0) {
        const apiData = await getWeatherData(location);
        if (apiData.invalidCity) {
          // If API service sends a 404 err
          return { success: false, error: "Invalid City" };
        }

        const insertStatus = await this.database.insertSingleWeather(apiData);
        return { success: true, body: insertStatus };
      }
      return { success: true, body: data };
    } catch (error) {
      return { success: false, error: (error as Error).stack };
    }
  }

  //Post /name route
  async updateWeather(locationId: Number, locationDeets: WeatherPost) {
    try {
      const dataExists = await this.database.checkLocationExists(locationId);
      if (dataExists.length > 0) {
        const status = await this.database.updateLocationWeather(
          locationId,
          locationDeets
        );
        return { success: true, body: status };
      }
      return {
        success: false,
        error: "Location doesn't exist in the Database",
      };
    } catch (error) {
      return { success: false, error: (error as Error).stack };
    }
  }
}

export default new weatherService(MySQLService);
