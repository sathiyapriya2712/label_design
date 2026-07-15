import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Pages imports
import Login from '../pages/Login/Login';
import ProfileSetup from '../pages/ProfileSetup/ProfileSetup';
import Dashboard from '../pages/Dashboard/Dashboard';
import Customisation from '../pages/Customisation/Customisation';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Payment from '../pages/Payment/Payment';
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess';
import OrderTracking from '../pages/OrderTracking/OrderTracking';
import Account from '../pages/Account/Account';
import NotFound from '../pages/NotFound/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes that DO NOT require profile completion to get in (but require auth) */}
      <Route
        path="/profile-setup"
        element={
          <ProtectedRoute requiresProfileCompleted={false}>
            <ProfileSetup />
          </ProtectedRoute>
        }
      />

      {/* Protected routes that REQUIRE profile completion */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customisation"
        element={
          <ProtectedRoute>
            <Customisation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-tracking"
        element={
          <ProtectedRoute>
            <OrderTracking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
