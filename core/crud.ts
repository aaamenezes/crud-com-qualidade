import fs from 'fs';
import { v4 as uuid } from 'uuid';

const DB_FILE_PATH = './core/db.json';

type UUID = string;

interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content,
    done: false
  };

  const todos: Array<Todo> = [
    ...read(),
    todo
  ];

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({todos}, null, 2)
  );

  return todo;
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  const db = JSON.parse(dbString || '{}');
  
  return db.todos || [];
}

// function update(id: string, partialTodo: Partial<Todo>) {
//   const todos = read();
//   const todoToUpdate = todos.find(currentTodo => currentTodo.id === id);
//   const newTodo = Object.assign(todoToUpdate, partialTodo);
// }

function update(id: UUID, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;
  const todos = read();

  todos.forEach(currentTodo => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));

  if (!updatedTodo) throw new Error('Please, provide another ID"');
  return updatedTodo;
}

function updateContentById(id: UUID, content: string): Todo {
  return update(
    id,
    { content }
  );
}

function deleteById(id: UUID) {
  const todos = read();
  const updatedTodos = todos.filter(todo => todo.id !== id);
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(
    { todos: updatedTodos }, null, 2
  ));
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, '');
}

/**
 * Execução:
 */

clearDB();
const firstTodo = create('Primeiro TODO');
console.log("firstTodo:", firstTodo);
const secondTodo = create('Segundo TODO');
const thirdTodo = create('Terceiro TODO');
deleteById(secondTodo.id);
updateContentById(thirdTodo.id, 'Terceiro atualizadasso!')

const todos = read();
console.log("todos:", todos);
console.log('todos.length:', todos.length);
console.log('\n');
console.log('\n');
console.log('================================================================');
console.log('\n');
console.log('\n');