import { useEffect, useState } from 'react';
import BasicTableOrders from '../BasicTableOrders';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import axios from '../../api/axios';
import '../ItemsPage.css';

const ORDERS = '/api/orders';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(ORDERS, {
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

  const productColumns = [
    { header: 'ID zamówienia', accessorKey: 'orderId' },
    { header: 'Klient', accessorKey: 'clientId' },
    { header: 'Ilość Produktów', accessorKey: 'totalAmount' },
    { header: 'Order Date', accessorKey: 'orderDate' },
    { header: 'Status', accessorKey: 'status' }
  ];

  return (
    <>
      <div className="wrapper">
        <NavBarBoodstrap />
        <section id="idTabelaProduktow">
          <BasicTableOrders data={orders} columns={productColumns} IdType="orderId" Navigate={true}/>
        </section>
      </div>
    </>
  );
}

export default OrdersPage;