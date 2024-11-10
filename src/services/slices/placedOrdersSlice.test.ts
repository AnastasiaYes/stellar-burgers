import { expect, test } from '@jest/globals';
import {
  placedOrdersSlice,
  initialState,
  TPlacedOrdersSlice,
  getPlacedOrders
} from '../slices/placedOrdersSlice';
import { TOrder } from '../../utils/types';

const mockPlacedOrders: TOrder[] = [
  {
    _id: '66ed6ad7119d45001b507edb',
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2024-09-20T12:29:48.229Z',
    updatedAt: '2024-09-20T12:29:48.709Z',
    number: 53442,
    ingredients: ['643d69a5c3f7b9001cfa093c']
  },
  {
    _id: '66ed7358119d45001b507ef4',
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-09-20T13:06:32.642Z',
    updatedAt: '2024-09-20T13:06:33.485Z',
    number: 53445,
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
  }
];

const createAction = (type: string, payload?: any, error?: string) => ({
  type,
  payload,
  error: error ? { message: error } : undefined
});

const createTestState = (action: any): TPlacedOrdersSlice =>
  placedOrdersSlice.reducer(initialState, action);

describe('Тестирование слайса placedOrdersSlice', () => {

  test('Проверяем состояние при getPlacedOrders.pending', () => {
    const action = createAction(getPlacedOrders.pending.type);
    const testState = createTestState(action);
    const expectedState: TPlacedOrdersSlice = { ...initialState, isLoading: true };
    expect(testState).toEqual(expectedState);
  });

  test('Проверяем состояние при getPlacedOrders.fulfilled', () => {
    const action = createAction(getPlacedOrders.fulfilled.type, mockPlacedOrders);
    const expectedState: TPlacedOrdersSlice = {
      ...initialState,
      orders: mockPlacedOrders,
      isLoading: false,
      error: null
    };
    const testState = createTestState(action);
    expect(testState).toEqual(expectedState);
  });

  test('Проверяем состояние при getPlacedOrders.rejected', () => {
    const errorMessage = 'Oшибка загрузки заказов';
    const action = createAction(getPlacedOrders.rejected.type, undefined, errorMessage);
    const expectedState: TPlacedOrdersSlice = {
      ...initialState,
      isLoading: false,
      error: errorMessage
    };
    const testState = createTestState(action);
    expect(testState).toEqual(expectedState);
  });
});
