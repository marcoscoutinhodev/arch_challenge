import express from 'express';

const app = express();

app.use(express.json());

// eslint-disable-next-line no-console
app.listen(4001, () => console.log('transaction-api is running..'));
