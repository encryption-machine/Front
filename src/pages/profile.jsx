import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigation } from '../components/Navigation/Navigation';
import { UserHistory } from '../components/UserHistory/UserHistory';

export const ProfilePage = () => {
  return (
    <>
      <Navigation />
      <UserHistory />
    </>
  );
};
