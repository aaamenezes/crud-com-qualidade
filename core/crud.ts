/* eslint-disable no-console */
import fs from 'fs';
import { v4 as uuid } from 'uuid';

// console.log('\n ======================================================= \n');

const DB_FILE_PATH = './core/db.json';

type UUID = string;

interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

export function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content,
    done: false
  };

  const todos: Array<Todo> = [...read(), todo];

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));

  return todo;
}

export function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  const db = JSON.parse(dbString || '{}');

  return db.todos || [];
}

export function update(id: UUID, partialTodo: Partial<Todo>): Todo {
  const todos = read();
  const todoToUpdate = todos.find(currentTodo => currentTodo.id === id);

  if (!todoToUpdate) throw new Error('Please, provide another ID');

  const updatedTodo = Object.assign(todoToUpdate, partialTodo);
  const newTodos = todos.map(todo => {
    return todo.id === id ? updatedTodo : todo;
  });

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos: newTodos }, null, 2));
  return updatedTodo;
}

function updateContentById(id: UUID, content: string): Todo {
  return update(id, { content });
}

function deleteById(id: UUID) {
  const todos = read();
  const updatedTodos = todos.filter(todo => todo.id !== id);
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({ todos: updatedTodos }, null, 2)
  );
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, '');
}

/**
 * Execução:
 */

clearDB();
const firstTodo = create('Primeiro TODO');
const secondTodo = create('Segundo TODO');
const thirdTodo = create('Terceiro TODO');
create('Quarto TODO');
create('Quinto TODO');
create('Sexto TODO');
create('Sétimo TODO');
create('Oitavo TODO');
create('Nono TODO');
create('Décimo TODO');
create('Décimo primeiro TODO');
// deleteById(secondTodo.id);
// updateContentById(thirdTodo.id, 'Terceiro atualizadasso!');
// updateContentById(firstTodo.id, 'Primeiro atualizadasso! 2');

// const todos = read();
// console.log('todos:', todos);
// console.log('todos.length:', todos.length);
// console.log('\n ======================================================= \n');
