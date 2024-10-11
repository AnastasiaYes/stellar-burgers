import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export type TOrderSlice = {
  orderData: TOrder | null;
  orderRequest: boolean;
  isLoading: boolean;
  postOrderError: string | null;
  fetchOrderByIdError: string | null;
};

export const initialState: TOrderSlice = {
  orderData: null,
  orderRequest: false,
  isLoading: false,
  postOrderError: null,
  fetchOrderByIdError: null
};

export const postOrder = createAsyncThunk(
  'order/post',
  async (data: string[]) => {
    const order = await orderBurgerApi(data);
    return order;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (data: number) => {
    const orderData = await getOrderByNumberApi(data);
    return orderData;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.orderData = null;
    }
  },
  selectors: {
    selectOrderData: (state) => state.orderData,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.postOrderError = 'Ошибка размещения заказа';
      })
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderData = action.payload.order;
        state.orderRequest = false;
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchOrderByIdError = 'Ошибка загрузки заказа';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload.orders[0];
      });
  }
});

export const { selectOrderData, selectOrderRequest } = orderSlice.selectors;
export const { clearOrderData } = orderSlice.actions;
export default orderSlice.reducer;
