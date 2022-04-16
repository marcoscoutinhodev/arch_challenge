import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export default (req: Request, res: Response, next: NextFunction) => {
  const requiredFields = [
    'accountId', 'transactionType', 'transactionAmount', 'transactionDate',
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  const {
    accountId, transactionType, transactionAmount, transactionDate,
  } = req.body;

  if (accountId < 1) {
    return res.status(400).json({ error: 'Invalid account id' });
  }

  if (transactionType !== 'deb' && transactionType !== 'cred') {
    return res.status(400).json({ error: 'Invalid transaction type' });
  }

  if (transactionAmount <= 0) {
    return res.status(400).json({ error: 'Invalid transaction amount' });
  }

  if (!validator.isDate(transactionDate)) {
    return res.status(400).json({ error: 'Invalid transaction date' });
  }

  return next();
};
