require("dotenv").config();
const express = require("express");
const DbService = require("./Data/mysqlmanager");
const api = require("./Services/apiservice");
const router = express.Router();

/* TODO: Controller: HTTP, service and data layers
 data layer into service, and service layer into controller
 */

// Instantiate a db service class object
// var db = new DbService();

// Get default weather for Bhubaneswar
router.get("/", async (req, res) => {
  try {
    const data = await api.getData();
    res.json(data);
  } catch (e) {
    res.send(e.message);
  }
});

// Get weather of specific location
router.get("/location", async (req, res) => {
  try {
    const loc = req.query.q;
    const data = await api.getData(loc);
    const { main, name, id } = data;
    const resData = [
      {
        main: main,
        name: name,
        id: id,
      },
    ];
    res.json(resData);
  } catch (e) {
    res.send(e.message);
  }
});

//Get air quality of specific location
router.get("/air", async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const data = await api.getAirData(lat, lon);
    res.json(data);
  } catch (e) {
    res.send(e.message);
  }
});

// Get all data from db
router.get("/all", async (req, res) => {
  try {
    const data = await db.getAll();
    res.json(data);
  } catch (e) {
    res.send(e.message);
  }
});

// Get specific data from db
router.post("/location", async (req, res) => {
  const loc = req.body.name;
  try {
    const data = await db.getLocation(loc);
    res.json(data);
  } catch (e) {
    res.send(e.message);
  }
});

// Add location data into db
router.post("/add", async (req, res) => {
  const locDetails = {
    name: req.body.name,
    temp: req.body.temp,
    pressure: req.body.pressure,
    owm_id: req.body.id,
  };
  try {
    await db.addLocation(locDetails);
    res.json({
      message: "Location added successfully",
    });
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
