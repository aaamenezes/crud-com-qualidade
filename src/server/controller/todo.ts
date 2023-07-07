import { todoRepository } from '@server/repository/todo';
import { z as schema } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';

async function get(req: NextApiRequest, res: NextApiResponse) {
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

const TodoCreteBodySchema = schema.object({
  content: schema.string()
});

async function create(req: NextApiRequest, res: NextApiResponse) {
  const body = TodoCreteBodySchema.safeParse(req.body);
  if (!body.success) {
    return res.status(400).json({
      message: 'You need to provide a content to create a TODO',
      description: body.error
    });
  }

  const createdTodo = await todoRepository.createByContent(body.data.content);

  res.status(201).json({
    todo: createdTodo
  });
}

export const todoController = { get, create };
