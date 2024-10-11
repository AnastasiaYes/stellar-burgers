import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import store, { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  burgerConstructorSlice,
  emptyConstructor,
  selectConstructorItem
} from '../../services/slices/constructorSlice';
import {
  clearOrderData,
  postOrder,
  selectOrderData,
  selectOrderRequest
} from '../../services/slices/orderSlice';
import { selectUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector((state) =>
    selectConstructorItem(state.constructor)
  );
  // console.log(store.getState());
  let orderRequest = useSelector((state) => selectOrderRequest(state.order));
  const orderModalData = useSelector((state) => selectOrderData(state.order));
  const user = useSelector((state) => selectUser(state.user));

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login'), { replace: true };
      return;
    }
    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(postOrder(orderIngredients));
    dispatch(clearOrderData());
  };

  const closeOrderModal = () => {
    dispatch(emptyConstructor());
    dispatch(clearOrderData());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
