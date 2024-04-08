
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Products from './components/Product';
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
      <Route path="/" element={< Layout/>}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="Home" element={<Home />} />
        <Route path="Product" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;
