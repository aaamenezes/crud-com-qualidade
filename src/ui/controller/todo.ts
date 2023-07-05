import { todoRepository } from '@ui/repository/todo';

interface TodoControllerGetParams {
  page: number;
}

async function get({ page }: TodoControllerGetParams) {
  return todoRepository.get({
    page: page,
    limit: 3
  });
}

export const todoController = {
  get
};
