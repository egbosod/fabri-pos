import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from './components/RootLayout';
import SalgPage from './pages/SalgPage';
import PriskontrollPage from './pages/PriskontrollPage';
import TidligereKjopPage from './pages/TidligereKjopPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/salg" replace /> },
      { path: 'salg', element: <SalgPage /> },
      { path: 'priskontroll', element: <PriskontrollPage /> },
      { path: 'tidligere-kjop', element: <TidligereKjopPage /> },
      { path: '*', element: <Navigate to="/salg" replace /> },
    ],
  },
]);