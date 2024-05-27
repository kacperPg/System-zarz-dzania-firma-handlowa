import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BasicTableOrders from '../BasicTableOrders';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import axios from '../../api/axios';
import '../ItemsPage.css';
import { useAuth } from '../AuthProvider';

const ORDERS = '/api/orders';

function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [ordersItems, setOrdersItems] = useState([]);
  const [client, setClient] = useState([]);
  const { auth } = useAuth();

  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(`${ORDERS}/${id}`, {
          headers: { 'Authorization': `Bearer ${auth.accessToken}` },
        });
        setOrder(res.data);
        setOrdersItems(res.data.orderItems);
        setClient(res.data.client);
      } catch (err) {
        if (!err?.response) {
          alert('No Server Response');
        } else if (err.response?.status === 401) {
          alert('Unauthorized');
        } else {
          alert('Failed to fetch order data');
        }
      }
    };
    if (id) {
      getOrder();
    }
  }, [id, token]);

  const orderColumns = [
    { header: 'ID zamówienia', accessorKey: 'orderId' },
    { header: 'Klient ID', accessorKey: 'client.clientId' },
    { header: 'Ilość Produktów', accessorKey: 'totalAmount' },
    { header: 'Data złożena zamówienia', accessorKey: 'orderDate' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Data zapłaty za zamówienie', accessorKey: 'paymentDate' },
    { header: 'Łączna cena', accessorKey: 'totalPrice' }
  ];
  const clientColumns = [
    { header: 'Klient ID', accessorKey: 'clientId' },
    { header: 'Nazwa Klienta', accessorKey: 'clientName' },
    { header: 'NIP', accessorKey: 'nipNumber' },
    { header: 'Adres', accessorKey: 'address' },
    { header: 'Email Klienta', accessorKey: 'clientEmail' },
  ];
  const orderItemsColumns = [
    { header: 'Produkt', accessorKey: 'productName' },
    { header: 'Ilość', accessorKey: 'quantity' },
    { header: 'Cena $', accessorKey: 'price' },
    { header: 'Nazwa Magazynu', accessorKey: 'warehouseName' }
  ];

  return (
    <div className="wrapper">
      <NavBarBoodstrap />
      <section id="idTabelaProduktow">
      <section id="Info">
        Zamówienie
      </section>
        {order && (
          <BasicTableOrders data={[order]} columns={orderColumns} Navigate={false} displayButtons={false} />
        )}
      </section>
        <section id="idTabelaProduktow">
        <section id="Info">
        Klient
      </section>
          <BasicTableOrders data={[client]} columns={clientColumns} Navigate={false} displayButtons={false}/>
      </section>
      <section id="idTabelaProduktow">
      <section id="Info">
        Zamówione Przedmioty
      </section>
        <BasicTableOrders data={ordersItems} columns={orderItemsColumns} Navigate={false} displayButtons={true}/>
      </section>
    </div>
  );
}

export default OrderPage;