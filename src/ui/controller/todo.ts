async function get() {
  return fetch('/api/todos').then(async response => {
    const todosString = await response.text();
    const todosFromServer = JSON.parse(todosString).todos;
    return todosFromServer;
  });
}

export const todoController = {
  get
};
