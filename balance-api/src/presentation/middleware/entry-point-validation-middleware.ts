import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const accountId = parseInt(req.params.accountId, 10);

  if (!accountId) {
    return res.status(400).json({ error: 'AccountId is required' });
  }

  if (accountId < 1) {
    return res.status(400).json({ error: 'Invalid AccountId' });
  }

  req.accountId = accountId;

  return next();
};
