require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDb = require("./db/connectDb");
const mainRouter = require("./routes/mainRouter");

const PORT = process.env.PORT || 3000;
const initAdmin = require("./utils/createFirstAdmin");
const { initializeMulter } = require("./config/multer.config");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongoose db connect
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port ", PORT);
    });
    initAdmin().then(() => {
      initializeMulter(app);
      app.use(mainRouter);
    });
    
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Weloce to the Bookstore API");
});
