import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainPage, ProfilePage } from '../pages';
import MainLayout from '../layouts/main-layout';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
]);
