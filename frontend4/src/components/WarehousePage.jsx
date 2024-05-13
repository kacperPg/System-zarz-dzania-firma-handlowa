import {  useEffect ,useState } from 'react'
import AddWareHouse from './AddWareHouse'
import BasicTable from './BasicTable'
import { NavBarBoodstrap } from './Navbar/navbarBS'
import axios from '../api/axios';
import './ItemsPage.css';
const WAREHOUSE_LIST = '/api/warehouses';

function WarehousePage() {
  const [products, setProducts] = useState([]);
  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(WAREHOUSE_LIST,
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
      header: 'Nazwa Magazynu',
      accessorKey: 'warehouseName',
    },
    {
      header: 'Lokalizacja',
      accessorKey: 'location',
    }
  ]

  return (
    <>
    <div class="wrapper">
         <NavBarBoodstrap />    
         <section id="buttonAddProduct">
          <AddWareHouse />

         </section>
         <section id="idTabelaProduktow">
            <BasicTable data={products} columns={productColumn2} URL={WAREHOUSE_LIST} IdType={'warehouseId'} />
            </section>
        </div>
    </>
  )
}

export default WarehousePage