import { useEffect, useState } from 'react';
import BasicTableOrders from '../BasicTableOrders';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import axios from '../../api/axios';
import '../ItemsPage.css';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute'; // Import PrivateRoute component

const ORDERS_SUMMARIES = '/api/orders/summaries';
const CLIENTS_API = '/api/clients';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const navigate = useNavigate();

  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(ORDERS_SUMMARIES, {
          headers: { 'Authorization': 'Bearer ' + token },
        });
        setOrders(res.data);
        setFilteredOrders(res.data);
      } catch (err) {
        if (!err?.response) {
          alert('No Server Response');
        } else if (err.response?.status === 401) {
          alert('Error');
        } else {
          alert('Failed');
        }
      }
    };

    const getClients = async () => {
      try {
        const res = await axios.get(CLIENTS_API, {
          headers: { 'Authorization': 'Bearer ' + token },
        });
        setClients(res.data);
      } catch (err) {
        if (!err?.response) {
          alert('No Server Response');
        } else if (err.response?.status === 401) {
          alert('Error');
        } else {
          alert('Failed');
        }
      }
    };

    getOrders();
    getClients();
  }, [token]);

  const handleAddOrderClick = () => {
    navigate('/AddOrder'); 
  };

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  const handleFilterClick = () => {
    const filtered = orders.filter(order =>
      order.clientName.toLowerCase().includes(selectedClient.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const productColumns = [
    { header: 'ID zamówienia', accessorKey: 'orderId' },
    { header: 'Klient', accessorKey: 'clientName' },
    { header: 'Ilość Produktów', accessorKey: 'totalAmount' },
    { header: 'Order Date', accessorKey: 'orderDate' },
    { header: 'Status', accessorKey: 'status' }
  ];

  return (
    <>
      <div className="wrapper">
        <NavBarBoodstrap />
        <section id="buttonAddProduct">
        <PrivateRoute requiredPermissions={['PERM_ADD_ORDER']}>
          <button onClick={handleAddOrderClick} id="buttonItem">
            Dodaj nowe zamówienie
          </button> 
          </PrivateRoute>
          <select value={selectedClient} onChange={handleClientChange}>
            <option value="">Wybierz klienta</option>
            {clients.map(client => (
              <option key={client.clientName} value={client.clientName}>
                {client.clientName}
              </option>
            ))}
          </select>
          <button onClick={handleFilterClick} id="buttonItem">
            Filter
          </button>
        </section>
      
        <section id="idTabelaProduktow">
          <BasicTableOrders data={filteredOrders} columns={productColumns} IdType="orderId" Navigate={true} displayButtons={true} />
        </section>
      </div>
    </>
  );
}

export default OrdersPage;