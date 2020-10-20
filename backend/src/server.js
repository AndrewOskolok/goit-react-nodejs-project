const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const swaggerUi = require('swagger-ui-express');
const { transactionRouter } = require('./transactions/transactions.router');
const { authRouter } = require('./auth/auth.router');
const { categoryRouter } = require('./categories/categories.router');
const swaggerDocument = require('../swagger.json');

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

exports.Server = class Server {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    await this.initDbConnection();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
    this.app.use(express.static('public'));
  }

  async initDbConnection() {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });

      console.log('Database connection successful');
    } catch (error) {
      console.log('Database connection failed');

      process.exit(1);
    }
  }

  initRoutes() {
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
    this.app.use('/transactions', transactionRouter);
    this.app.use('/auth', authRouter);
    this.app.use('/categories', categoryRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const status = err.status || 500;
      return res.status(status).send(err.message);
    });
  }

  startListening() {
    this.app.listen(process.env.PORT, () => {
      console.log('Started listening on port', process.env.PORT);
    });
  }
};
