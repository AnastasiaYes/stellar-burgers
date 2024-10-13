import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import { AppHeader } from '@components';
// import { useEffect } from 'react';
import styles from './app.module.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { IngredientDetails, Modal, OrderInfo, FeedInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useEffect } from 'react';
import { getUser } from '../../services/slices/userSlice';
import { getIngredients } from '../../services/slices/ingredientSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const goBack = () => navigate(-1);
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='login'
            element={
              <ProtectedRoute allowOnlyGuest={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='register'
            element={
              <ProtectedRoute allowOnlyGuest>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='forgot-password'
            element={
              <ProtectedRoute allowOnlyGuest={false}>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='reset-password'
            element={
              <ProtectedRoute allowOnlyGuest={false}>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute allowOnlyGuest={false}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='profile/orders'
            element={
              <ProtectedRoute allowOnlyGuest={false}>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title={''} onClose={goBack}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={''} onClose={goBack}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title={''} onClose={goBack}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
