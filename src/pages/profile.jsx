import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProfilePage = observer(() => {
  // const adminData = userStore(store => store.adminData);
  const auth = true;
  return auth ? (
    <div>здесь будет страница пользователя</div>
  ) : (
    <Navigate to="/" />
  );
});
