import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { buildCorsOptions } from './config/cors.js';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFoundHandler } from './middlewares/not-found.middleware.js';
import { requestContext } from './middlewares/request-context.middleware.js';
import { apiRouter } from './routes/index.js';

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(cors(buildCorsOptions()));
app.use(compression());
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(requestContext);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(env.UPLOAD_DIR));
app.use('/api', apiLimiter);
app.use(apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;