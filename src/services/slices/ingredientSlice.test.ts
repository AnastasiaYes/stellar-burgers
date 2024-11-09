import { expect, test } from '@jest/globals';
import {
  getIngredients,
  ingredientsSlice,
  initialState,
  TIngredientsSlice
} from '../slices/ingredientSlice';
import { TIngredient } from '../../utils/types';

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
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
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
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

const mockIngredients = [mainIngredient, sauceIngredient];

const createPendingAction = () => ({ type: getIngredients.pending.type });
const createFulfilledAction = (payload: TIngredient[]) => ({
  type: getIngredients.fulfilled.type,
  payload
});
const createRejectedAction = (error: string) => ({
  type: getIngredients.rejected.type,
  error: { message: error }
});

const createTestState = (action: any): TIngredientsSlice => ingredientsSlice.reducer(initialState, action);

describe('проверка работы слайса ingredientsSlice', () => {

  test('состояние при getIngredients.pending изменяется на загрузку', () => {
    const action = createPendingAction();
    const testState = createTestState(action);
    const expectedState: TIngredientsSlice = { ...initialState, isLoading: true, error: null };
    expect(testState).toEqual(expectedState);
  });

  test('состояние при getIngredients.fulfilled обновляется с данными', () => {
    const action = createFulfilledAction(mockIngredients);
    const testState = createTestState(action);
    const expectedState: TIngredientsSlice = {
      ingredients: mockIngredients,
      isLoading: false,
      error: null
    };
    expect(testState).toEqual(expectedState);
  });

  test('состояние при getIngredients.rejected обновляется с ошибкой', () => {
    const errorMessage = 'ingredients loading error';
    const action = createRejectedAction(errorMessage);
    const testState = createTestState(action);
    const expectedState: TIngredientsSlice = {
      ...initialState,
      isLoading: false,
      error: errorMessage
    };
    expect(testState).toEqual(expectedState);
  });
});
