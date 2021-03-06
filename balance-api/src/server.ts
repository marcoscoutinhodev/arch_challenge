/* eslint-disable no-console */
import 'module-alias/register';
import express from 'express';
import env from '@/config/env';

import entryPointValidationMiddleware from '@/presentation/middleware/entry-point-validation-middleware';
import entryPoint from './presentation/entry-point';

import mongoHelper from '@/infra/mongo-helper';
import redisHelper from '@/infra/redis-helper';

const app = express();

app.use(express.json());

app.get('/:accountId?', entryPointValidationMiddleware, entryPoint.handle);

mongoHelper.connect(env.mongoUri)
  .then(async () => {
    console.log('MongoDB connected');

    await redisHelper.redisClient.connect();
    console.log('Redis connected');

    await redisHelper.subscriber.connect();
    console.log('Subscriber connected');

    app.listen(env.port, () => console.log('balance-api is running..\n\n'));
  });
