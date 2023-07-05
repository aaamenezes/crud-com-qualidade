import React, { useEffect, useState } from 'react';
import { GlobalStyles } from '@ui/theme/GlobalStyles';
import { todoController } from '@ui/controller/todo';

const bg = 'https://mariosouto.com/cursos/crudcomqualidade/bg';

interface HomeTodo {
  id: string;
  content: string;
}

export default function Home() {
  const [todos, setTodos] = useState<HomeTodo[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const hasMorePages = totalPages > page;

  useEffect(() => {
    todoController.get({ page }).then(({ todos, pages }) => {
      setTodos(currentTodos => [...currentTodos, ...todos]);
      setTotalPages(pages);
    });
  }, [page]);

  return (
    <main>
      <GlobalStyles themeName="red" />
      <header style={{ backgroundImage: `url('${bg}')` }}>
        <div className="typewriter">
          <h1>O que fazer hoje?</h1>
        </div>
        <form>
          <input type="text" placeholder="Correr, Estudar..." />
          <button type="submit" aria-label="Adicionar novo item">
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input type="text" placeholder="Filtrar lista atual, ex: Dentista" />
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
            {todos.map(currentTodo => {
              return (
                <tr key={currentTodo.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{currentTodo.id.substring(0, 4)}</td>
                  <td>{currentTodo.content}</td>
                  <td align="right">
                    <button data-type="delete">Apagar</button>
                  </td>
                </tr>
              );
            })}

            {/* <tr>
              <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                Carregando...
              </td>
            </tr> */}

            {/* <tr>
              <td colSpan={4} align="center">
                Nenhum item encontrado
              </td>
            </tr> */}

            {hasMorePages && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                  <button
                    data-type="load-more"
                    onClick={() => setPage(cur => cur + 1)}
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
