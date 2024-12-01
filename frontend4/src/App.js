import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ItemsPage from './components/ItemsPage/ItemsPage';
import TypePage from './components/TypePage/TypePage';
import WarehousePage from './components/WarehousePage/WarehousePage';
import WarehousesStatusPage from './components/WarehouseStatePage/WarehousesStatusPage';
import UserPage from './components/UserPage/UserPage';
import OrdersPage from './components/OrdersPage/OrdersPage';
import OrderPage from './components/OrdersPage/OrderPage';
import AddOrder from './components/OrdersPage/AddOrder';
import EditOrderPage from './components/OrdersPage/EditOrderPage';
import ClientPage from './components/ClientPage/ClientPage';
import RaportPage from './components/RaportPage/RaportPage';
import RolesPage from './components/RolePage/RolesPage';
import NewRolePage from './components/RolePage/NewRolePage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="products" element={
          <PrivateRoute requiredPermissions={['PERM_VIEW_PRODUCTS']}>
            <ItemsPage />
          </PrivateRoute>
        } />
        <Route path="types" element={
          <PrivateRoute requiredPermissions={['PERM_VIEW_TYPES']}>
            <TypePage />
          </PrivateRoute>
        } />
        <Route path="warehousePage" element={
          <PrivateRoute requiredPermissions={['PERM_VIEW_WAREHOUSES']}>
            <WarehousePage />
          </PrivateRoute>
        } />
        <Route path="warehousesStatusPage" element={
          <PrivateRoute requiredPermissions={['PERM_VIEW_STATUS']}>
            <WarehousesStatusPage />
          </PrivateRoute>
        } />
        <Route path="userPage" element={
          <PrivateRoute requiredPermissions={['PERM_VIEW_USERS']}>
            <UserPage />
          </PrivateRoute>
        } />
        <Route path="ordersPage" element={
          <PrivateRoute requiredPermissions={['PERM_VIEW_ORDER']}>
            <OrdersPage />
          </PrivateRoute>
        } />
        <Route path="order/:id" element={
          <PrivateRoute requiredPermissions={['PERM_VIEW_ORDER']}>
            <OrderPage />
          </PrivateRoute>
        } />
        <Route path="editOrder/:orderId" element={
          <PrivateRoute requiredPermissions={['PERM_EDIT_ORDER']}>
            <EditOrderPage />
          </PrivateRoute>
        } />
        <Route path="clientPage" element={
          <PrivateRoute requiredPermissions={['PERM_VIEW_CLIENTS']}>
            <ClientPage />
          </PrivateRoute>
        } />
        <Route path="addOrder" element={
          <PrivateRoute requiredPermissions={['PERM_ADD_ORDER']}>
            <AddOrder />
          </PrivateRoute>
        } />
        <Route path="raportPage" element={
          <PrivateRoute requiredPermissions={['PERM_VIEW_STATUS']}>
            <RaportPage />
          </PrivateRoute>
        } />
        <Route path="rolesPage" element={
          <PrivateRoute requiredPermissions={['PERM_VIEW_USERS']}>
            <RolesPage />
          </PrivateRoute>
        } />
        <Route path="addRole" element={
          <PrivateRoute requiredPermissions={['PERM_EDIT_USERS']}>
            <NewRolePage />
          </PrivateRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;