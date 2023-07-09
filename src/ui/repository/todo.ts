import { Todo, TodoSchema } from '@ui/schema/todo';
import { z as schema } from 'zod';

interface TodoRepositoryGetParams {
  page: number;
  limit: number;
}

interface TodoRepositoryGetOutput {
  todos: Todo[];
  total: number;
  pages: number;
}

async function get({
  page,
  limit
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
  return fetch(`/api/todos?page=${page}&limit=${limit}`).then(
    async ServerResponse => {
      const todosString = await ServerResponse.text();
      const parsedResponse = parseTodosFromServer(JSON.parse(todosString));

      return {
        todos: parsedResponse.todos,
        total: parsedResponse.total,
        pages: parsedResponse.pages
      };
    }
  );
}

async function createByContent(content: string): Promise<Todo> {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify({ content })
  });

  if (response.ok) {
    const serverResponse = await response.json();
    const serverResponseSchema = schema.object({
      todo: TodoSchema
    });
    const serverResponseParsed = serverResponseSchema.safeParse(serverResponse);

    if (!serverResponseParsed.success) throw new Error('Failed to create TODO');

    const todo = serverResponseParsed.data.todo;
    return todo;
  }

  throw new Error('Failed to create TODO');
}

async function toggleDone(id: string): Promise<Todo> {
  const response = await fetch(`/api/todos/${id}/toggle-done`, {
    method: 'PUT'
  });

  if (!response.ok) throw new Error('Server error');

  const serverResponse = await response.json();
  const serverResponseSchema = schema.object({
    todo: TodoSchema
  });
  const serverResponseParsed = serverResponseSchema.safeParse(serverResponse);

  if (!serverResponseParsed.success) {
    throw new Error(`Failed to update TODO with id ${id}`);
  }

  const updatedTodo = serverResponseParsed.data.todo;
  return updatedTodo;
}

export const todoRepository = {
  get,
  createByContent,
  toggleDone
};

// Model/schema
// interface Todo {
//   id: string;
//   content: string;
//   date: Date;
//   done: boolean;
// }

function parseTodosFromServer(responseBody: unknown): {
  total: number;
  pages: number;
  todos: Array<Todo>;
} {
  if (
    responseBody !== null &&
    typeof responseBody === 'object' &&
    'todos' in responseBody &&
    'total' in responseBody &&
    'pages' in responseBody &&
    Array.isArray(responseBody.todos)
  ) {
    return {
      total: Number(responseBody.total),
      pages: Number(responseBody.pages),
      todos: responseBody.todos.map((todo: unknown) => {
        if (todo === null && typeof todo !== 'object') {
          throw new Error('invalid todo from API');
        }

        const { id, content, done, date } = todo as {
          id: string;
          content: string;
          done: string;
          date: string;
        };

        return {
          id,
          content,
          done: String(done).toLocaleLowerCase() === 'true',
          date: date
        };
      })
    };
  }

  return {
    todos: [],
    total: 0,
    pages: 1
  };
}
