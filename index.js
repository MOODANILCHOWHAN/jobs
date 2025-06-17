// run `node index.js` in the terminal

// console.log(`Hello Node.js v${process.versions.node}!`);

import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/jobRoute.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.error(' MongoDB connection error:', err));

  app.use('/',router)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server was running at ports',port);
});
