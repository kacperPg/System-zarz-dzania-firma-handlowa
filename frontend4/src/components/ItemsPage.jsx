import {  useEffect ,useState } from 'react'
import AddProduct from './AddProduct'
import BasicTable from './BasicTable'
import { NavBarBoodstrap } from './Navbar/navbarBS'
import axios from '../api/axios';
import './ItemsPage.css';
const PRODUCT_LIST = '/api/products';

function ItemsPage() {
  const [products, setProducts] = useState([]);
  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(PRODUCT_LIST,
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
      header: 'Nazwa Produktu',
      accessorKey: 'productName',
    },
    {
      header: 'Cena',
      accessorKey: 'price',
    },
    {
      header: 'Type Name',
      accessorKey: 'typeName',
    },
  ]

  return (
    <>
    <div class="wrapper">
         <NavBarBoodstrap />    
         <section id="buttonAddProduct">
          <AddProduct />

         </section>
         <section id="idTabelaProduktow">
            <BasicTable data={products} columns={productColumn2} URL={PRODUCT_LIST} IdType={"productId"}/>
            </section>
        </div>
    </>
  )
}

export default ItemsPage