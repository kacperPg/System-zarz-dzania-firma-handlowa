import {  useEffect ,useState } from 'react'
import AddWarehousesStatus from './AddWarehousesStatus'
import BasicTable from './BasicTable'
import { NavBarBoodstrap } from './Navbar/navbarBS'
import axios from '../api/axios';
import './ItemsPage.css';
const WAREHOUSESTATUS_LIST = '/api/warehousesStatus';

function WarehousesStatusPage() {
  const [products, setProducts] = useState([]);
  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(WAREHOUSESTATUS_LIST,
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
      accessorKey: 'warehouseId',
    },
    {
      header: 'Dostępna ilość',
      accessorKey: 'availableQuantity',
    },
    {
      header: 'Sprzedana ilość',
      accessorKey: 'soldQuantity',
    },
    {
      header: 'Produkt',
      accessorKey: 'productId',
    }
  
  ]

  return (
    <>
    <div class="wrapper">
         <NavBarBoodstrap />    
         <section id="buttonAddProduct">
          <AddWarehousesStatus />

         </section>
         <section id="idTabelaProduktow">
            <BasicTable data={products} columns={productColumn2} />
            </section>
        </div>
    </>
  )
}

export default WarehousesStatusPage