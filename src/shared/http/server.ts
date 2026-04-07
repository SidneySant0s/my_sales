import express from "express";
import 'express-async-errors';
import 'reflect-metadata';
import cors from "cors";
import { errors } from "celebrate";

import routes from "./routes";
import ErrorHandleMiddleware from "./ErrorHandleMiddleware";
import { AppDataSource } from "@shared/typeorm/data-source";


AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(routes);
    app.use(errors());
    app.use(ErrorHandleMiddleware.haddleError)

    // eslint-disable-next-line no-console
    console.log('Connect to the database!!')

    app.listen(3333, () => {
      // eslint-disable-next-line no-console
      console.log('Server started on port 3333!')
    })
  })
  .catch( error => {
    // eslint-disable-next-line no-console
    console.error('Falied to connect to the database:', error)
  })

