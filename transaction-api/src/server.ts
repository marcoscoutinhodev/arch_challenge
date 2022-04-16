/* eslint-disable no-console */
import 'module-alias/register';
import express from 'express';
import env from '@/config/env';

import entryPoint from '@/presentation/entry-point';
import entryPointValidationMiddleware from '@/presentation/middleware/entry-point-validation-middleware';

import mongoHelper from './infra/mongo-helper';
import redisHelper from './infra/redis-helper';

const app = express();

app.use(express.json());

app.post('/', entryPointValidationMiddleware, entryPoint.handle);

mongoHelper.connect(env.mongoUri)
  .then(() => {
    console.log('MongoDB connected');

    redisHelper.redisClient
      .connect()
      .then(() => {
        console.log('Redis connected');

        app.listen(env.port, () => console.log('transaction-api is running..\n\n'));
      });
  });
