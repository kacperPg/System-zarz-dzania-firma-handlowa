import {  useEffect ,useState } from 'react'
import AddType from './AddType'
import BasicTable from './BasicTable'
import { NavBarBoodstrap } from './Navbar/navbarBS'
import axios from '../api/axios';
import './ItemsPage.css';
const TYPE_LIST = '/api/productTypes';

function TypePage() {
  const [products, setProducts] = useState([]);
  let token = sessionStorage.getItem('token');

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

  /** @type import('@tanstack/react-table').ColumnDef<any> */

  const productColumn2 = [

    {
      header: 'Nazwa Rodzaju',
      accessorKey: 'typeName',
    }
  ]

  return (
    <>
    <div class="wrapper">
         <NavBarBoodstrap />    
         <section id="buttonAddProduct">
          <AddType />

         </section>
         <section id="idTabelaProduktow">
            <BasicTable data={products} columns={productColumn2} />
            </section>
        </div>
    </>
  )
}

export default TypePage