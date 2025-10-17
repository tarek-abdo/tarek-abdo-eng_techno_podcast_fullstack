import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import podcastRoutes from './routes/podcastRoutes';
import helmet from 'helmet';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://localhost:3000", "ws://localhost:3000"],
        imgSrc: ["'self'", "data:", "blob:", "https://res.cloudinary.com"],
        mediaSrc: ["'self'", "data:", "blob:", "https://res.cloudinary.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        // Allow 'unsafe-eval' in development only (some dev tools inject eval)
        scriptSrc: process.env.NODE_ENV === 'production' ? ["'self'", "'unsafe-inline'"] : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      },
    },
  })
);


app.use('/api/podcasts', podcastRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
