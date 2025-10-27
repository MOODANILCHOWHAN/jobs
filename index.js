// // run `node index.js` in the terminal

// // console.log(`Hello Node.js v${process.versions.node}!`);

// import express, { json } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import router from './routes/jobRoute.js';
// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // console.log('MONGO_URI:', process.env.MONGO_URI);
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDb connected successfully"))
//   .catch((error) => console.log("Failed to connect mongoDB", error));
//   app.use('/',router)
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log('server was running at ports',port);
// });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/jobRoute.js";
import cors from "cors";
import logInRouter from "./routes/logIn.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json({ limit: "30mb" }));

app.use("/", router);
app.use("/test",(req,res)=>{
  res.send("Server is running fine.")
})
app.use("/auth",logInRouter)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
      socketTimeoutMS:60000
    });
    console.log(" MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // stop server if DB fails to connect
  }
};


connectDB();
app.listen(PORT, console.log(`server running ${PORT}`));
