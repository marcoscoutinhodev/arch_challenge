import { Request, Response } from 'express';
import { log } from 'console';
import Facade from '@/domain/use-case/facade';

const facade = new Facade();

class EntryPoint {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const accountBalance = await facade.exec(req.accountId);

      if (accountBalance) {
        log(`Account Balance: ${accountBalance}\n`);
        return res.status(200).json({ accountBalance });
      }

      log('No transactions found for this account id\n');
      return res
        .status(400)
        .json({ error: 'No transactions found for this account id' });
    } catch (err: any) {
      return res
        .status(500)
        .json(err.message);
    }
  }
}

export default new EntryPoint();
