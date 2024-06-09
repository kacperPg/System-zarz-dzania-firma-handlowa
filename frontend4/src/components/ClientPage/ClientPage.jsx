import { useEffect, useState } from 'react';
import AddClient from './AddClient';
import BasicTable from '../BasicTable';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import axios from '../../api/axios';
import '../ItemsPage.css';
import PrivateRoute from '../PrivateRoute'; // Import PrivateRoute component

const CLIENT_LIST = '/api/clients';

function ClientPage() {
  const [clients, setClients] = useState([]);
  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(CLIENT_LIST, {
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
      getProducts();
  }, [token]);

  const ClientColums = [
    {
      header: 'Id',
      accessorKey: 'clientId',
    },
    {
      header: 'Nazwa Klienta',
      accessorKey: 'clientName',
    },
    {
      header: 'NIP',
      accessorKey: 'nipNumber',
    },
    {
      header: 'Numer telefonu',
      accessorKey: 'phoneNumber',
    },
    {
      header: 'Adress',
      accessorKey: 'address',
    },
    {
      header: 'Email',
      accessorKey: 'clientEmail',
    },
  ];

  return (
    <>
      <div className="wrapper">
        <NavBarBoodstrap />
        <section id="buttonAddProduct">
        <PrivateRoute requiredPermissions={['PERM_ADD_CLIENTS']}>
          <AddClient />
        </PrivateRoute>
        </section>
        <section id="idTabelaProduktow">
          <BasicTable data={clients} columns={ClientColums} URL={CLIENT_LIST} IdType="clientId" canDelete="PERM_DELETE_CLIENTS" />
        </section>
      </div>
    </>
  );
}

export default ClientPage;
