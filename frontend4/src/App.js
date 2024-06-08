
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
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
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Routes>
     <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />  
                <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="Home" element={<Home />} />
        <Route path="Products" element={<ItemsPage />} />
        <Route path="Types" element={<TypePage />} />
        <Route path="WarehousePage" element={<WarehousePage />} />
        <Route path="WarehousesStatusPage" element={<WarehousesStatusPage />} />
        <Route path="UserPage" element={<UserPage />} />
        <Route path="OrdersPage" element={<OrdersPage />} />
        <Route path="Order/:id" element={<OrderPage />} />
        <Route path="editOrder/:orderId" element={<EditOrderPage />} />
        <Route path="ClientPage" element={<ClientPage />} />
        <Route path="AddOrder" element={<AddOrder />} />
        <Route path="RaportPage" element={<RaportPage />} />
        <Route path="RolesPage" element={<RolesPage />} />
        <Route path="AddRole" element={<NewRolePage />} />
      </Route>
    </Routes>
  );
}

export default App;
