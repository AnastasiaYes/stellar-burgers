import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

export type TIngredientsSlice = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TIngredientsSlice = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/get', async () =>
  getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'selectIngredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'ingredients loading error';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const selectBuns = (state: TIngredientsSlice) =>
  state.ingredients.filter((ingredient) => ingredient.type === 'bun');

export const selectMains = (state: TIngredientsSlice) =>
  state.ingredients.filter((ingredient) => ingredient.type === 'main');

export const selectSauces = (state: TIngredientsSlice) =>
  state.ingredients.filter((ingredient) => ingredient.type === 'sauce');

export const selectIngredients = (state: { ingredients: TIngredientsSlice }) =>
  state.ingredients.ingredients;

export const selectIsLoading = (state: { ingredients: TIngredientsSlice }) =>
  state.ingredients.isLoading;

export default ingredientsSlice.reducer;
