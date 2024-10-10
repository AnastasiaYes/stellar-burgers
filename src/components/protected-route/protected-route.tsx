import React from 'react';
import { useSelector } from '../../services/store';
import { useLocation, Navigate } from 'react-router-dom';
// import { selectUser } from '../../services/slices/userSlice';
import { Preloader } from '../../components/ui/preloader/preloader';

type ProtectedRouteProps = {
    allowOnlyGuest?: boolean; //разрешить просмотр только гостю
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
                                   allowOnlyGuest
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = false; // todo remove
  // const { user, isAuthChecked } = useSelector(selectUser);
  const user = null; // todo remove
  const isUserLoggedIn = user !== null; // пользователь вошел

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (allowOnlyGuest) {
    if (isUserLoggedIn) {
      return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
    }
  }
  if (!allowOnlyGuest) {
    if (!isUserLoggedIn) {
      return (
        <Navigate
          replace
          to='/login'
          state={{
            from: location
          }}
        />
      );
    }
  }
  return children;
};
