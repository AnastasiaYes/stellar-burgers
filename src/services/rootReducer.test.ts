import { rootReducer } from './store';
import { initialState as burgerConstructorInitialState } from './slices/constructorSlice';
import { initialState as ingredientsInitialState } from './slices/ingredientSlice';
import { initialState as userInitialState } from './slices/userSlice';
import { initialState as feedsInitialState } from './slices/feedSlice';
import { initialState as userOrdersInitialState } from './slices/placedOrdersSlice';
import { initialState as newOrderInitialState } from './slices/orderSlice';

describe('rootReducer', () => {
  test('initialState', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState.constructorItems).toEqual(
      burgerConstructorInitialState
    );
    expect(initialState.ingredient).toEqual(ingredientsInitialState);
    expect(initialState.user).toEqual(userInitialState);
    expect(initialState.feed).toEqual(feedsInitialState);
    expect(initialState.placedOrders).toEqual(userOrdersInitialState);
    expect(initialState.order).toEqual(newOrderInitialState);
  });
});
