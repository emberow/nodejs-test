import 'reflect-metadata';
import * as swaggerUi from 'swagger-ui-express';
import swaggerJSDoc = require('swagger-jsdoc');
import express = require('express');
import logger from './utils/logger/logger';
import { AppRoutes } from './routes';
import * as http from 'http';
import errorHandler from './middleware/errorHandler';
import { connectLogger } from 'log4js';
import { createConnection } from 'typeorm';
import dbconfig from './config/database';


const PORT = 3000;
createConnection(dbconfig).then(async (connection) => {
  console.log("執行中");
  
  const app = express();

   // Logger module for http request/response
   app.use(connectLogger(logger, {
    level: 'auto',
    format: (req, res, format) => format(`:remote-addr :method[:status][:response-timems] :url ${JSON.stringify(req.body)}`),
    nolog: '/\.(gif|jpe?g|png)$/',
  }));

  AppRoutes.forEach((route) => {
    app[route.method](
      route.path,
      ...route.middlewares,
    );
  });

  app.use(errorHandler);
  // Swagger definition
  const swaggerDefinition = {
      info: {
        title: 'REST API for my App', // Title of the documentation
        version: '1.0.0', // Version of the app
        description: 'This is the REST API for my product', // short description of the app
      },
      host: 'localhost:' + PORT, // the host or url of the app
      basePath: '/', // the basepath of your endpoint
      securityDefinitions: {
        APIKeyHeader: {
          type: 'apiKey',
          in: 'header',
          name: 'authorization',
        },
      },
      security: {
        APIKeyHeader: [],
      },
    };

  const options = {
      // import swaggerDefinitions
      swaggerDefinition,
      // path to the API docs
      apis: ['./docs/**/*.yaml'],
    };
  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  http.createServer(app).listen(PORT, () => {
    // if (error) {
    //   logger.error(error);
    //   return process.exit(1);
    // } else {
      logger.info('Listening on port: ' + PORT + '.');
    // }
  });
}).catch((error) => { logger.error(error); });
