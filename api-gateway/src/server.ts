import express from 'express';
import httpProxy from 'express-http-proxy';

import env from './config/env';

const app = express();

app.use(express.json());

app.use('/transaction', httpProxy(env.transactionApiRoute, { timeout: 3000 }));
app.use('/balance/:accountId?', httpProxy(env.balanceApiRoute, {
  timeout: 3000,
  proxyReqPathResolver(req) {
    const { accountId } = req.params;
    return env.balanceApiRoute + accountId;
  },
}));

// eslint-disable-next-line no-console
app.listen(env.port, () => console.log(`API Gateway is running on port ${env.port}...`));
