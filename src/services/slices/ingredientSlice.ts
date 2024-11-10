import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

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
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading
  }
});

export const selectBuns = (ingrs: TIngredient[]) =>
  ingrs.filter((ingredient) => ingredient.type === 'bun');

export const selectMains = (ingrs: TIngredient[]) =>
  ingrs.filter((ingredient) => ingredient.type === 'main');

export const selectSauces = (ingrs: TIngredient[]) =>
  ingrs.filter((ingredient) => ingredient.type === 'sauce');
//
// export const selectIngredients = (state: TIngredientsSlice) =>
//   state.ingredients;
//
// export const selectIsLoading = (state: TIngredientsSlice) => state.ingredients;

export const { selectIngredients, selectIsLoading } =
  ingredientsSlice.getSelectors();
export default ingredientsSlice.reducer;
