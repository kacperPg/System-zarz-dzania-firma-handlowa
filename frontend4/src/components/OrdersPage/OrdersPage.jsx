import { useEffect, useState } from 'react';
import BasicTableOrders from '../BasicTableOrders';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import axios from '../../api/axios';
import '../ItemsPage.css';
import { useNavigate } from 'react-router-dom'; 

const ORDERS_SUMMARIES = '/api/orders/summaries';
const ORDERS = '/api/orders';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); 

  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(ORDERS_SUMMARIES, {
          headers: { 'Authorization': 'Bearer ' + token },
        });
        setOrders(res.data);
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
  }, [token]);

  const handleAddOrderClick = () => {
    navigate('/AddOrder');  // Navigate to the Add Order page
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
        <button onClick={handleAddOrderClick} id="buttonItem">
            Dodaj nowe zamówienie
          </button>
        </section>
        <section id="idTabelaProduktow">
          <BasicTableOrders data={orders} columns={productColumns} IdType="orderId" Navigate={true} displayButtons={true}/>
        </section>
      </div>
    </>
  );
}

export default OrdersPage;