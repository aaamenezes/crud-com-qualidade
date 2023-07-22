import { todoController } from '@server/controller/todo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    res.status(405).json({
      error: {
        message: 'Method not allowed'
      }
    });
    return;
  }

  await todoController.deleteById(req, res);
}
