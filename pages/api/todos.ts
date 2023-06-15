import { NextApiRequest, NextApiResponse } from 'next';
import { todoController } from '@server/controller/todo';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('req.method:', req.method);

  if (req.method === 'GET') return todoController.get(req, res);

  res.status(405).json({
    message: 'Method not allowed'
  });
}
