// import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AuthFormGlobalStore as formStore } from '../stores';
import { Navigation } from '../components/Navigation/Navigation';
import { UserHistory } from '../components/UserHistory/UserHistory';

export const ProfilePage = observer(() => {
  return (
    <>
      {formStore.loggedIn ? (
        <>
          <Navigation />
          <UserHistory />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
});
