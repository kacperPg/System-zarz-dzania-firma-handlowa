import {  useEffect ,useState } from 'react'
import BasicTable from '../BasicTable'
import { NavBarBoodstrap } from '../Navbar/navbarBS'
import axios from '../../api/axios';
import '../ItemsPage.css';
import Cookies from 'js-cookie';  

const USER_LIST = '/api/users';

function WarehousesStatusPage() {
  const [Users, setUsers] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(USER_LIST,
          {
            headers: {  'Authorization': 'Bearer ' +  token
          }
        }
        );
        setUsers(res.data);
      } catch (err) {
        if (!err?.response) {
          alert('No Server Response');
        }  else if (err.response?.status === 401) {
          alert('Error');
        } else {
             alert('Failed');
        }
    }
    };
    getProducts();
  }, []);


  const productColumn2 = [

    {
      header: 'ID',
      accessorKey: 'id',
      sortingFn: 'basic',
    },
    {
      header: 'Imię',
      accessorKey: 'name',
    },
    {
      header: 'Nazwisko',
      accessorKey: 'lastName',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    }  
  ]

  return (
    <>
    <div class="wrapper">
         <NavBarBoodstrap />    
         <section id="idTabelaProduktow">
            <BasicTable data={Users} columns={productColumn2} URL={USER_LIST} IdType={'id'} canDelete="PERM_DELETE_USERS"/>
            </section>
        </div>
    </>
  )
}

export default WarehousesStatusPage