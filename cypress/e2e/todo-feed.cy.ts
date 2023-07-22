const BASE_URL = 'http://localhost:3000';

describe('/ - todo feed', () => {
  it('when load, renders the page', () => {
    cy.visit(BASE_URL);
  });

  it('when create a new todo, it must appears in the screen', () => {
    const testMessage = 'Test of Todo on Cypress';

    cy.intercept('POST', `${BASE_URL}/api/todos`, request => {
      request.reply({
        statusCode: 201,
        body: {
          todo: {
            id: '70905d7e-c969-45b1-99f0-1aa155477204',
            date: '2023-04-15T19:46:51.109Z',
            content: testMessage,
            done: false
          }
        }
      });
    }).as('createTodo');

    cy.visit(BASE_URL);
    // cy.task('log', '👌👌👌👌👌👌👌👌👌👌👌👌👌👌');
    // cy.task('log', BASE_URL);
    cy.get('input[name="add-todo"]').type(testMessage);
    cy.get('[aria-label="Adicionar novo item"]').click();
    cy.get('table > tbody').contains(testMessage);
  });
});
