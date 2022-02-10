const connection = require("./db");

class DbService {
  async getAll() {
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query("SELECT * FROM weather", (err, res) => {
          if (err) {
            reject(err.message);
          }
          resolve(res);
        });
      });
      return response;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  async getLocation(location) {
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM weather where name = ?",
          [location],
          (err, res) => {
            if (err) {
              reject(err.message);
            }
            resolve(res);
          }
        );
      });
      return response;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  async addLocation(locDetails) {
    console.log(locDetails);
    try {
      const { name, temp, pressure, owm_id } = locDetails;
      const response = await new Promise((resolve, reject) => {
        var query = `
          INSERT INTO weather (name, temp, pressure, owm_id) 
          VALUES (?, ?, ?, ?)
          ON DUPLICATE KEY
          UPDATE temp=VALUES(temp), pressure=VALUES(pressure)`;
        connection.query(query, [name, temp, pressure, owm_id], (err, res) => {
          if (err) {
            reject(new Error(err.message));
            throw err;
          }
          resolve(res);
        });
      });
      return response;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = DbService;
