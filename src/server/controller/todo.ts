import { todoRepository } from '@server/repository/todo';
import { NextApiRequest, NextApiResponse } from 'next';

function get(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const page = Number(query.page);
  const limit = Number(query.limit);

  if (query.page && isNaN(page)) {
    res.status(400).json({
      error: {
        message: '`Page` must be a number'
      }
    });
    return;
  }

  if (query.limit && isNaN(limit)) {
    res.status(400).json({
      error: {
        message: '`limit` must be a number'
      }
    });
    return;
  }

  const output = todoRepository.get({ page, limit });
  res.status(200).json(output);
}

export const todoController = { get };
