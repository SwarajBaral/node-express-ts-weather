import * as mysql from "mysql";

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "node_weather",
});

class MysqlManager {
  async query(stmt: any, params: any = null) {
    try {
      const response = await new Promise((resolve, reject) => {
        try {
          pool.query(stmt, params, (err, res) => {
            if (err) {
              reject(err);
              console.log(err);
            }
            resolve(res);
          });
        } catch (error) {
          throw error;
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async execute(stmt: any, params: any = null) {
    try {
      const execStatus = await new Promise((resolve, reject) => {
        try {
          pool.query(stmt, params, (err, res) => {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(res);
          });
        } catch (error) {
          throw error;
        }
      });
      return execStatus;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export const db = new MysqlManager();
