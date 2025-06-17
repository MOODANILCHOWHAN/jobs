// run `node index.js` in the terminal

// console.log(`Hello Node.js v${process.versions.node}!`);

import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.error(' MongoDB connection error:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server was running at ports');
});
