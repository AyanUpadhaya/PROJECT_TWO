const express = require("express");
const bookRoutes = require("./bookRoutes");
const categoryRoutes = require("./categoryRoutes");
const orderRoutes = require("./orderRoutes");
const storeRoutes = require("./storeRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

const routes = [
  { path: "/", route: bookRoutes },
  { path: "/", route: categoryRoutes },
  { path: "/", route: orderRoutes },
  { path: "/", route: storeRoutes },
  { path: "/", route: userRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
