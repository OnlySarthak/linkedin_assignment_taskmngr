import express from 'express';
import connectDB from './src/utils/connectDB.js';
import dotenv from 'dotenv';
import router from './src/routers/routers.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:5173', 'http://43.204.218.177',];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api', router);

connectDB().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});