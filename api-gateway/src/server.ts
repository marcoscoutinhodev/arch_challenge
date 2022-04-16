import express from 'express';
import httpProxy from 'express-http-proxy';

const app = express();

app.use(express.json());

app.use('/transaction', httpProxy('http://127.0.0.1:4001/', { timeout: 3000 }));
app.use('/balance/:accountId?', httpProxy('http://127.0.0.1:4002/', {
  timeout: 3000,
  proxyReqPathResolver(req) {
    const { accountId } = req.params;
    return `http://127.0.0.1:4002/${accountId}`;
  },
}));

// eslint-disable-next-line no-console
app.listen(4000, () => console.log('API Gateway running...'));
