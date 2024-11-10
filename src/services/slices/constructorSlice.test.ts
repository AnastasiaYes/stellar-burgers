import { burgerConstructorSlice, addIngredient, deleteIngredient, moveIngredient, emptyConstructor } from '../slices/constructorSlice';
import { TIngredient } from '@utils-types';

const bunIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
};

const mainIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
};

const sauceIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
};

const initialState = {
  bun: null,
  ingredients: [],
};

describe('burgerConstructorSlice', () => {

  describe('добавление ингредиента', () => {

    test('добавление булки в конструктор', () => {
      const expectedState = {
        bun: { ...bunIngredient, id: expect.any(String) },
        ingredients: [],
      };

      const testState = burgerConstructorSlice.reducer(initialState, addIngredient(bunIngredient));

      expect(testState).toEqual(expectedState);
    });

    test('добавление основного ингредиента в конструктор', () => {
      const expectedState = {
        bun: null,
        ingredients: [{ ...mainIngredient, id: expect.any(String) }],
      };

      const testState = burgerConstructorSlice.reducer(initialState, addIngredient(mainIngredient));

      expect(testState).toEqual(expectedState);
    });

    test('добавление соуса в конструктор', () => {
      const expectedState = {
        bun: null,
        ingredients: [{ ...sauceIngredient, id: expect.any(String) }],
      };

      const testState = burgerConstructorSlice.reducer(initialState, addIngredient(sauceIngredient));

      expect(testState).toEqual(expectedState);
    });
  });

  describe('удаление ингредиента', () => {

    test('удаление основного ингредиента', () => {
      const initialStateWithIngredients = {
        bun: { ...bunIngredient, id: '1' },
        ingredients: [
          { ...mainIngredient, id: '2' },
          { ...sauceIngredient, id: '3' }
        ],
      };

      const expectedState = {
        bun: { ...bunIngredient, id: '1' },
        ingredients: [{ ...sauceIngredient, id: '3' }],
      };

      const testState = burgerConstructorSlice.reducer(initialStateWithIngredients, deleteIngredient('2'));

      expect(testState).toEqual(expectedState);
    });

    test('удаление соуса', () => {
      const initialStateWithIngredients = {
        bun: { ...bunIngredient, id: '1' },
        ingredients: [
          { ...mainIngredient, id: '2' },
          { ...sauceIngredient, id: '3' }
        ],
      };

      const expectedState = {
        bun: { ...bunIngredient, id: '1' },
        ingredients: [{ ...mainIngredient, id: '2' }],
      };
      
      const testState = burgerConstructorSlice.reducer(initialStateWithIngredients, deleteIngredient('3'));
      
      expect(testState).toEqual(expectedState);
    });
  });

  describe('перемещение ингредиента', () => {

    test('перемещение ингредиента с позиции 3 на позицию 2', () => {
      const initialStateWithIngredients = {
        bun: { ...bunIngredient, id: '1' },
        ingredients: [
          { ...mainIngredient, id: '2' },
          { ...sauceIngredient, id: '3' }
        ],
      };

      const expectedState = {
        bun: { ...bunIngredient, id: '1' },
        ingredients: [
          { ...sauceIngredient, id: '3' },
          { ...mainIngredient, id: '2' }
        ],
      };

      const testState = burgerConstructorSlice.reducer(initialStateWithIngredients, moveIngredient({ from: 1, to: 0 }));

      expect(testState).toEqual(expectedState);
    });

    test('перемещение ингредиента с позиции 2 на позицию 1', () => {
      const initialStateWithIngredients = {
        bun: { ...bunIngredient, id: '1' },
        ingredients: [
          { ...sauceIngredient, id: '3' },
          { ...mainIngredient, id: '2' }
        ],
      };

      const expectedState = {
        bun: { ...bunIngredient, id: '1' },
        ingredients: [
          { ...mainIngredient, id: '2' },
          { ...sauceIngredient, id: '3' }
        ],
      };

      const testState = burgerConstructorSlice.reducer(initialStateWithIngredients, moveIngredient({ from: 1, to: 0 }));

      expect(testState).toEqual(expectedState);
    });
  });

  describe('очистка конструктора', () => {

    test('очистка конструктора', () => {
      const initialStateWithIngredients = {
        bun: { ...bunIngredient, id: '1' },
        ingredients: [
          { ...mainIngredient, id: '2' },
          { ...sauceIngredient, id: '3' }
        ],
      };

      const expectedState = {
        bun: null,
        ingredients: [],
      };

      const testState = burgerConstructorSlice.reducer(initialStateWithIngredients, emptyConstructor());

      expect(testState).toEqual(expectedState);
    });
  });
});
