interface TodoRepositoryGetParams {
  page: number;
  limit: number;
}

interface TodoRepositoryGetOutput {
  todos: Todo[];
  total: number;
  pages: number;
}

function get({
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

export const todoRepository = {
  get
};

// Model/schema
interface Todo {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}

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
          date: new Date(date)
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
