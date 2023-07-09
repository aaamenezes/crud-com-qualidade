import { todoRepository } from '@ui/repository/todo';
import { Todo } from '@ui/schema/todo';
import { z as schema } from 'zod';

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

interface TodoControllerCreateParams {
  content?: string;
  onError: () => void;
  onSuccess: (todo: Todo) => void;
}

function create({ content, onError, onSuccess }: TodoControllerCreateParams) {
  const parsedParams = schema.string().nonempty().safeParse(content);

  if (!parsedParams.success) return onError();

  todoRepository
    .createByContent(parsedParams.data)
    .then(newTodo => onSuccess(newTodo))
    .catch(() => onError());
}

interface TodoControllerToggleDoneParams {
  id: string;
  updateTodoOnScreen: () => void;
  onError: () => void;
}

function toggleDone({
  id,
  updateTodoOnScreen,
  onError
}: TodoControllerToggleDoneParams) {
  todoRepository.toggleDone(id).then(updateTodoOnScreen).catch(onError);
}

export const todoController = {
  get,
  filterTodosByContent,
  create,
  toggleDone
};
