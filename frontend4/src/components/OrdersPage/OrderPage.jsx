import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BasicTableOrders from '../BasicTableOrders';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import axios from '../../api/axios';
import '../ItemsPage.css';

const ORDERS = '/api/orders';
const ORDERS_ITEMS = '/api/orderItems/orderId';

function OrderPage() {
  const { id } = useParams();  // Use the useParams hook to get the id from the URL
  const [order, setOrder] = useState(null);
  const [ordersItems, setOrdersItems] = useState([]);

  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(`${ORDERS}/${id}`, {
          headers: { 'Authorization': 'Bearer ' + token },
        });
        setOrder(res.data);
        setOrdersItems(res.data.orderItems)
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
    if (id) {
      getOrder();
    }
  }, [id, token]);

  useEffect(() => {
    const getOrdersItems = async () => {
      try {
        const res = await axios.get(`${ORDERS_ITEMS}/${id}`, {
          headers: { 'Authorization': 'Bearer ' + token },
        });
        setOrdersItems(res.data);
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
    if (id) {
      getOrdersItems();
    }
  }, [id, token]);

  const orderColumns = [
    { header: 'ID zamówienia', accessorKey: 'orderId' },
    { header: 'Klient', accessorKey: 'clientId' },
    { header: 'Ilość Produktów', accessorKey: 'totalAmount' },
    { header: 'Order Date', accessorKey: 'orderDate' },
    { header: 'Status', accessorKey: 'status' }
  ];

  const orderItemsColumns = [
    { header: 'productId', accessorKey: 'productId' },
    { header: 'Ilość', accessorKey: 'quantity' },
    { header: 'Cena $', accessorKey: 'price' }
  ];

  return (
    <div className="wrapper">
      <NavBarBoodstrap />
      <section id="Info">
      Zamówienie
      </section>
      <section id="idTabelaProduktow">
        {order && (
          <BasicTableOrders data={[order]} columns={orderColumns} Navigate={false}/>
        )}
      </section>
      <section id="Info">
    Zamówione Przedmioty
    </section>
      <section id="idTabelaProduktow">
        <BasicTableOrders data={ordersItems} columns={orderItemsColumns} Navigate={false}/>
      </section>
    </div>
  );
}

export default OrderPage;
