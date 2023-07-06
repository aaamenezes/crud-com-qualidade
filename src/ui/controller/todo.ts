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

function filterTodosByContent<Todo>(
  searchTerm: string,
  todos: Array<Todo & { content: string }>
): Array<Todo> {
  return todos.filter(todo => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const normalizedContent = todo.content.toLowerCase();
    return normalizedContent.includes(normalizedSearchTerm);
  });
}

export const todoController = {
  get,
  filterTodosByContent
};
