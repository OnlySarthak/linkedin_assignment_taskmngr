import express from 'express';
import connectDB from './src/utils/connectDB.js';
import dotenv from 'dotenv';
import router from './src/routers/routers.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "https://linkedin-assignment-taskmngr-git-main-onlysarthaks-projects.vercel.app",
  "https://linkedin-assignment-taskmngr-2ttku6hlb-onlysarthaks-projects.vercel.app",
  "https://linkedin-assignment-taskmngr-l2487jzk1-onlysarthaks-projects.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use('/api', router);

connectDB().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
});