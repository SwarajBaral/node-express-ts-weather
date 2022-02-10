var mysql = require("mysql");
var connection = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "node_weather",
});

// connection.connect((err) => {
//   if(err) throw err;
//   console.log("Database connected");
// })

module.exports = connection;
