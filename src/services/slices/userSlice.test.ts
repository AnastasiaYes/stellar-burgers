import { expect, test } from '@jest/globals';
import {
  initialState,
  getUser,
  userLogout,
  userLogin,
  userSlice,
  userRegister,
  updateUser,
  IUserSlice,
  checkUser
} from '../slices/userSlice';
import { TUserResponse } from '../../utils/burger-api';

describe('Тестирование слайса userSlice', () => {

  const mockUserResponse: TUserResponse = {
    success: true,
    user: {
      email: 'nik@yandex.ru',
      name: 'Nik'
    }
  };

  const testAction = (actionType: string, payload?: any) => {
    return userSlice.reducer(initialState, { type: actionType, payload });
  };

  const testPendingState = (actionType: string) => {
    const newState = testAction(actionType);
    expect(newState).toEqual({ ...initialState, isLoading: true });
  };

  const testFulfilledState = (actionType: string, payload: any, expectedState: IUserSlice) => {
    const newState = testAction(actionType, payload);
    expect(newState).toEqual(expectedState);
  };

  const testRejectedState = (actionType: string, expectedState: IUserSlice) => {
    const newState = testAction(actionType);
    expect(newState).toEqual(expectedState);
  };

  test('getUser.pending', () => {
    testPendingState(getUser.pending.type);
  });

  test('getUser.fulfilled', () => {
    testFulfilledState(getUser.fulfilled.type, mockUserResponse, {
      ...initialState,
      user: mockUserResponse.user,
      isAuthChecked: true
    });
  });

  test('getUser.rejected', () => {
    testRejectedState(getUser.rejected.type, {
      ...initialState,
      isLoading: false,
      error: 'Ошибка получения данных'
    });
  });

  test('checkUser.pending', () => {
    testPendingState(checkUser.pending.type);
  });

  test('checkUser.fulfilled', () => {
    const action = checkUser.fulfilled.type;
    const newState = testAction(action);
    expect(newState).toEqual({ ...initialState, isAuthChecked: true });
  });

  test('checkUser.rejected', () => {
    testRejectedState(checkUser.rejected.type, {
      ...initialState,
      isLoading: false,
      error: 'Пользователь не зарегистрирован'
    });
  });

  // Тест для updateUser
  test('updateUser.pending', () => {
    testPendingState(updateUser.pending.type);
  });

  test('updateUser.fulfilled', () => {
    testFulfilledState(updateUser.fulfilled.type, mockUserResponse, {
      ...initialState,
      user: mockUserResponse.user,
    });
  });

  test('updateUser.rejected', () => {
    testRejectedState(updateUser.rejected.type, {
      ...initialState,
      isLoading: false,
      error: 'Обновление пользователя не удалось'
    });
  });

  test('userRegister.pending', () => {
    testPendingState(userRegister.pending.type);
  });

  test('userRegister.fulfilled', () => {
    testFulfilledState(userRegister.fulfilled.type, mockUserResponse, {
      ...initialState,
      user: mockUserResponse.user,
    });
  });

  test('userRegister.rejected', () => {
    testRejectedState(userRegister.rejected.type, {
      ...initialState,
      isLoading: false,
      error: 'Регистрация не удалась'
    });
  });

  test('userLogin.pending', () => {
    testPendingState(userLogin.pending.type);
  });

  test('userLogin.fulfilled', () => {
    const action = userLogin.fulfilled.type;
    const newState = testAction(action, mockUserResponse.user);
    expect(newState).toEqual({
      ...initialState,
      user: mockUserResponse.user,
      isAuthChecked: true
    });
  });

  test('userLogin.rejected', () => {
    testRejectedState(userLogin.rejected.type, {
      ...initialState,
      isLoading: false,
      error: 'Вход не удался'
    });
  });

  test('userLogout.pending', () => {
    testPendingState(userLogout.pending.type);
  });

  test('userLogout.fulfilled', () => {
    const newState = testAction(userLogout.fulfilled.type);
    expect(newState).toEqual(initialState);
  });

  test('userLogout.rejected', () => {
    testRejectedState(userLogout.rejected.type, {
      ...initialState,
      isAuthChecked: true,
      isLoading: false,
      error: 'Выход не удался'
    });
  });
});
