import {  useEffect ,useState } from 'react'
import AddType from './AddType'
import BasicTable from '../BasicTable'
import { NavBarBoodstrap } from '../Navbar/navbarBS'
import axios from '../../api/axios';
import '../ItemsPage.css';
import PrivateRoute from '../PrivateRoute'; 
import Cookies from 'js-cookie';  

const TYPE_LIST = '/api/productTypes';

function TypePage() {
  const [products, setProducts] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(TYPE_LIST,
          {
            headers: {  'Authorization': 'Bearer ' +  token
          }
        }
        );
        setProducts(res.data);
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
    header: 'Id',
    accessorKey: 'typeId',
  },
    {
      header: 'Nazwa Rodzaju',
      accessorKey: 'typeName',
    }
  ]

  return (
    <>
    <div class="wrapper">
         <NavBarBoodstrap />    
         <section id="idTabelaProduktow">
         <section >
         <PrivateRoute requiredPermissions={['PERM_ADD_TYPES']}>
          <AddType />
        </PrivateRoute>
         </section>
            <BasicTable data={products} columns={productColumn2} URL={TYPE_LIST} IdType={'typeId'} canDelete="PERM_DELETE_TYPES" />
            </section>
        </div>
    </>
  )
}

export default TypePage