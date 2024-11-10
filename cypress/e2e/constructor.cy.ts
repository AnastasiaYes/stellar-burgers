describe('проверка работы конструктора', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json');
    cy.fixture('feed.json');
    cy.fixture('user.json');
    cy.fixture('order.json');

    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', '/api/orders/all', { fixture: 'feed.json' }).as('getFeed');
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.setCookie('accessToken', 'mockAccessToken1234');
    localStorage.setItem('refreshToken', 'mockRefreshToken1234');

    cy.visit('http://localhost:4000/');

    cy.wait('@getIngredients');
  });

  it('должен открывать модальное окно ингредиента по клику и должно закрываться модальное окно по нажатию на крестик', () => {
    cy.get(`[data-cy='modal']`).should('not.exist');
    cy.get(`[data-cy='ingredients-module'] [data-cy='ingredient-item']`).contains('Филе Люминесцентного тетраодонтимформа').click();

    cy.get(`[data-cy='modal']`).should('be.visible');
    cy.get(`[data-cy='modal']`).should('contain.text', 'Филе Люминесцентного тетраодонтимформа');

    cy.get(`[data-cy='modal']`).find('button').click();
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('должно закрываться модальное окно по нажатию на кнопку esc', () => {
    cy.get(`[data-cy='modal']`).should('not.exist');
    cy.get(`[data-cy='ingredients-module'] [data-cy='ingredient-item']`).first().click();

    cy.get(`[data-cy='modal']`).should('be.visible');

    cy.get('body').type('{esc}');
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('должен добавляться ингредиент в конструктор', () => {
    cy.get(`[data-cy='constructor-module'] .text_type_main-default`).contains('Выберите булки');

    cy.get(`[data-cy='ingredients-module'] [data-cy='ingredient-item'] button`).first().click()
      .parent().find('a > p').first().invoke('text').then(text => {
      cy.get(`[data-cy='constructor-module'] .constructor-element.constructor-element_pos_top .constructor-element__text`)
        .should('contain.text', text); // Проверяем, что ингредиент добавлен в конструктор
    });
  });

  it('проверка авторизации пользователя', () => {
    cy.visit('http://localhost:4000/profile');
    cy.get(`[data-cy='profile-name']`).should('have.value', 'anastasia');
  });

  it('проверка оформления заказа', () => {
    cy.get(`[data-cy='burger-ingredients_section']`).contains('Булки').next('ul').contains('Добавить').click();

    cy.get(`[data-cy='burger-ingredients_section']`).contains('Начинки').next('ul').contains('Добавить').click();

    cy.get('button').contains('Оформить заказ').click();

    cy.get(`[data-cy='modal']`).should('be.visible');
    cy.get('[data-cy="modal"]').should('contain.text', '68');

    cy.get(`[data-cy='modal']`).find('button').click();
    cy.get(`[data-cy='modal']`).should('not.exist');

    cy.get(`[data-cy='constructor-module']`).contains('Выберите начинку');
    cy.get(`[data-cy='constructor-module']`).contains('Выберите булки');
  });
});
