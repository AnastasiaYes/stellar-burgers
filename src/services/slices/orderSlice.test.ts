import { expect, test } from '@jest/globals';
import { TOrderResponse, TNewOrderResponse } from '../../utils/burger-api';
import {
    fetchOrderByNumber,
    orderSlice,
    initialState,
    TOrderSlice,
    postOrder
} from '../slices/orderSlice';

const mockOrderResponse: TOrderResponse = {
    success: true,
    orders: [
        {
            _id: '66ed7358119d45001b507ef4',
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2024-09-20T13:06:32.642Z',
            updatedAt: '2024-09-20T13:06:33.485Z',
            number: 53445,
            ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
        },
        {
            _id: '66ed6ad7119d45001b507edb',
            status: 'done',
            name: 'Краторный бургер',
            createdAt: '2024-09-20T12:29:48.229Z',
            updatedAt: '2024-09-20T12:29:48.709Z',
            number: 53442,
            ingredients: ['643d69a5c3f7b9001cfa093c']
        }
    ]
};

const mockOrderToPostResponse: TNewOrderResponse = {
    success: true,
    order: {
        _id: '66ed7358119d45001b507ef4',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-09-20T13:06:32.642Z',
        updatedAt: '2024-09-20T13:06:33.485Z',
        number: 53445,
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
    },
    name: 'nik'
};

const expectStateToEqual = (actionType: string, expectedState: TOrderSlice, payload?: any) => {
  const action = payload ? { type: actionType, payload } : { type: actionType };
  const testState = orderSlice.reducer(initialState, action);
  expect(testState).toEqual(expectedState);
};

describe('проверим слайс orderSlice', () => {
    test('проверим fetchOrderByNumber.pending', () => {
      const expectedState: TOrderSlice = { ...initialState, isLoading: true };
      expectStateToEqual(fetchOrderByNumber.pending.type, expectedState)
    });

    test('проверим fetchOrderByNumber.fulfilled', () => {
      const expectedState: TOrderSlice = {
        ...initialState,
        orderData: mockOrderResponse.orders[0]
      };
      expectStateToEqual(fetchOrderByNumber.fulfilled.type, expectedState, mockOrderResponse);
    });

    test('проверим fetchOrderByNumber.rejected', () => {
      const expectedState: TOrderSlice = {
        ...initialState,
        fetchOrderByIdError: 'Ошибка загрузки заказа'
      };
      expectStateToEqual(fetchOrderByNumber.rejected.type, expectedState);
    });

    test('проверим postOrder.pending', () => {
      const expectedState: TOrderSlice = { ...initialState, orderRequest: true };
      expectStateToEqual(postOrder.pending.type, expectedState);
    });

    test('проверим postOrder.fulfilled', () => {
      const expectedState: TOrderSlice = {
        ...initialState,
        orderData: mockOrderToPostResponse.order
      };
      expectStateToEqual(postOrder.fulfilled.type, expectedState, mockOrderToPostResponse);
    });

    test('проверим postOrder.rejected', () => {
      const expectedState: TOrderSlice = {
        ...initialState,
        postOrderError: 'Ошибка размещения заказа'
      };
      expectStateToEqual(postOrder.rejected.type, expectedState);
    });
});
