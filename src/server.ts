import express, { Application } from 'express';
import routes from './routes'; // Import aggregated routes
import dotenv from 'dotenv';
import { initModels } from './models';
import sequelize from './db/sequelize';
import { seedDatabase } from './db/seed';
import passport from './config/passport.config';
import session from 'express-session';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

app.use(
  session({
    secret: 'v€ry$€cr€tK€y',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
      httpOnly: true, // Prevent access via JavaScript
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err.stack); // Log stack trace in development
    }

    res.status(err.status || 500).json({
      error:
        process.env.ENVIRONMENT === 'dev'
          ? err.message
          : 'Internal Server Error',
    });
  },
);

// Start the server and initialize the database
const startServer = async () => {
  try {
    await initModels(sequelize); // Connect to the database and sync models

    if (process.env.ENVIRONMENT == 'dev') {
      await sequelize.sync({ force: true });
      await seedDatabase();
    }

    await app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
