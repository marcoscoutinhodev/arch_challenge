export default {
  port: process.env.GATEWAY_PORT || 4000,
  transactionApiRoute: process.env.TRANSACTION_API_ROUTE || 'http://127.0.0.1:4001/',
  balanceApiRoute: process.env.BALANCE_API_ROUTE || 'http://127.0.0.1:4002/',
};
