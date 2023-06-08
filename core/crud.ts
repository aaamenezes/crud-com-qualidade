import fs from 'fs';
import { v4 as uuid } from 'uuid';

const DB_FILE_PATH = './core/db.json';

interface Todo {
  id: string;
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

function updateContentById(id: string, content: string): Todo {
  return update(
    id,
    { content }
  );
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

function update(id: string, partialTodo: Partial<Todo>): Todo {
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

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, '');
}

clearDB();
create('Primeiro TODO');
const todo = create('Segundo TODO');
// console.log(read());
// update(todo.id, {
//   content: 'CARAI',
//   done: true
// });
updateContentById(todo.id, 'Atualizadasso!')