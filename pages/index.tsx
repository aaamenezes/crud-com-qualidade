import React, { useEffect, useRef, useState } from 'react';
import { GlobalStyles } from '@ui/theme/GlobalStyles';
import { todoController } from '@ui/controller/todo';

const bg = 'https://mariosouto.com/cursos/crudcomqualidade/bg';

interface HomeTodo {
  id: string;
  content: string;
  done: boolean;
}

export default function Home() {
  const initialLoadComplete = useRef(false);
  const [todos, setTodos] = useState<HomeTodo[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTodoContent, setNewTodoContent] = useState('');

  const homeTodos = todoController.filterTodosByContent<HomeTodo>(
    searchTerm,
    todos
  );

  const hasMorePages = totalPages > page;
  const hasNoTodos = homeTodos.length === 0 && !isLoading;

  useEffect(() => {
    if (!initialLoadComplete.current) {
      todoController
        .get({ page })
        .then(({ todos, pages }) => {
          setTodos(todos);
          setTotalPages(pages);
        })
        .finally(() => {
          setIsLoading(false);
          initialLoadComplete.current = true;
        });
    }
  }, [page]);

  return (
    <main>
      <GlobalStyles themeName="red" />
      <header style={{ backgroundImage: `url('${bg}')` }}>
        <div className="typewriter">
          <h1>O que fazer hoje?</h1>
        </div>
        <form
          onSubmit={event => {
            event.preventDefault();
            todoController.create({
              content: newTodoContent,
              onError() {
                alert('falta content');
              },
              onSuccess(todo: HomeTodo) {
                setTodos(currentTodos => {
                  return [todo, ...currentTodos];
                });
                setNewTodoContent('');
              }
            });
          }}
        >
          <input
            type="text"
            name="add-todo"
            placeholder="Correr, Estudar..."
            value={newTodoContent}
            onChange={event => setNewTodoContent(event.target.value)}
          />
          <button type="submit" aria-label="Adicionar novo item">
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input
            type="text"
            placeholder="Filtrar lista atual, ex: Dentista"
            value={searchTerm}
            onChange={event => {
              setSearchTerm(event.target.value);
            }}
          />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Id</th>
              <th align="left">Conteúdo</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {homeTodos.map(todo => {
              return (
                <tr key={todo.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => {
                        todoController.toggleDone({
                          id: todo.id,
                          updateTodoOnScreen() {
                            setTodos(currentTodos => {
                              return currentTodos.map(currentTodo => {
                                return currentTodo.id === todo.id
                                  ? { ...currentTodo, done: !currentTodo.done }
                                  : currentTodo;
                              });
                            });
                          },
                          onError() {
                            alert('Fail to update TODO');
                            alert(`Todo content: ${todo.content}`);
                            alert(`Todo ID: ${todo.id}`);
                          }
                        });
                      }}
                    />
                  </td>
                  <td>{todo.id.substring(0, 4)}</td>
                  <td>{todo.done ? <s>{todo.content}</s> : todo.content}</td>
                  <td align="right">
                    <button
                      data-type="delete"
                      onClick={() => {
                        todoController
                          .deleteById(todo.id)
                          .then(() => {
                            setTodos(currentTodos => {
                              return currentTodos.filter(currentTodo => {
                                return currentTodo.id !== todo.id;
                              });
                            });
                          })
                          .catch(() => console.error('Failed to delete'));
                      }}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              );
            })}

            {isLoading && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                  Carregando...
                </td>
              </tr>
            )}

            {hasNoTodos && (
              <tr>
                <td colSpan={4} align="center">
                  Nenhum item encontrado
                </td>
              </tr>
            )}

            {hasMorePages && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                  <button
                    data-type="load-more"
                    onClick={() => {
                      setIsLoading(true);
                      const nextPage = page + 1;
                      setPage(nextPage);
                      todoController
                        .get({ page: nextPage })
                        .then(({ todos, pages }) => {
                          setTodos(currentTodos => [...currentTodos, ...todos]);
                          setTotalPages(pages);
                        })
                        .finally(() => {
                          setIsLoading(false);
                        });
                    }}
                  >
                    Página {page} - Carregar mais{' '}
                    <span
                      style={{
                        display: 'inline-block',
                        marginLeft: '4px',
                        fontSize: '1.2em'
                      }}
                    >
                      ↓
                    </span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
