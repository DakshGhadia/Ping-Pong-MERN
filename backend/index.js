import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/resultRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors({
  origin: 'https://ping-pong-frontend.onrender.com', // Allow requests from this origin
}));
app.use("/results", router);

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("App connected to database");

    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
