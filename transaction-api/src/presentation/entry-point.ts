import { Request, Response } from 'express';
import StateEngine from '@/domain/use-case/state-engine';

const stateEngine = new StateEngine();

class EntryPoint {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const transanctionAdded = await stateEngine.exec(req.body);

      if (transanctionAdded) {
        return res
          .status(200)
          .json('Transaction added');
      }

      return res
        .status(400)
        .json({ error: 'Insufficient balance for this transaction' });
    } catch (err: any) {
      return res
        .status(500)
        .json(err.message);
    }
  }
}

export default new EntryPoint();
