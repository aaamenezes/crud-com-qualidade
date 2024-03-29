import { todoController } from '@server/controller/todo';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // response.status(200).json({ message: 'Toggle done' });
  if (req.method !== 'PUT') {
    res.status(405).json({
      error: {
        message: 'Method not allowed'
      }
    });
    return;
  }

  todoController.toggleDone(req, res);
}
