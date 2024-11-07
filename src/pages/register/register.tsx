import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;
import {
  resetError,
  selectUser,
  userRegister
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isLoading } = useSelector((state) => selectUser(state.user));

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(userRegister({ email, name: userName, password }));
  };
  const errorText = error || '';
  useEffect(() => {
    dispatch(resetError());
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <RegisterUI
          errorText={errorText}
          email={email}
          userName={userName}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setUserName={setUserName}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
