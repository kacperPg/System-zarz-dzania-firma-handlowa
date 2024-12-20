import { useEffect, useState } from 'react';
import AddProduct from './AddProduct';
import BasicTable from '../BasicTable';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import axios from '../../api/axios';
import '../ItemsPage.css';
import PrivateRoute from '../PrivateRoute'; 
import Cookies from 'js-cookie';  

const PRODUCT_LIST = '/api/products';
const TYPE_LIST = '/api/productTypes';
const PRODUCT_BY_TYPE = '/api/products/byType';

function ItemsPage() {
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const token = Cookies.get('token');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(PRODUCT_LIST, {
          headers: { 'Authorization': 'Bearer ' + token },
        });
        setProducts(res.data);
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

    const getProductTypes = async () => {
      try {
        const res = await axios.get(TYPE_LIST, {
          headers: { 'Authorization': 'Bearer ' + token },
        });
        setProductTypes(res.data);
      } catch (err) {
        console.error('Error fetching product types:', err);
      }
    };

    getProducts();
    getProductTypes();
  }, [token]);

  const handleTypeChange = async (e) => {
    const typeName = e.target.value;
    setSelectedType(typeName);

    if (typeName === '') {
      const res = await axios.get(PRODUCT_LIST, {
        headers: { 'Authorization': 'Bearer ' + token },
      });
      setProducts(res.data);
    } else {
      try {
        const res = await axios.get(`${PRODUCT_BY_TYPE}/${typeName}`, {
          headers: { 'Authorization': 'Bearer ' + token },
        });
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products by type:', err);
      }
    }
  };

  const options = productTypes.map(type => (
    <option key={type.typeId} value={type.typeId}>{type.typeName}</option>
  ));

  const productColumns = [
    {
      header: 'Id',
      accessorKey: 'productId',
    },

    {
      header: 'Nazwa Produktu',
      accessorKey: 'productName',
    },
    {
      header: 'Cena PLN',
      accessorKey: 'price',
    },
    {
      header: 'Rodzaj',
      accessorKey: 'typeName',
    },
  ];

  return (
    <>
      <div className="wrapper">
        <NavBarBoodstrap />
        <section id="idTabelaProduktow">
        <section >
        <PrivateRoute requiredPermissions={['PERM_ADD_ITEMS']}>
          <AddProduct />
        </PrivateRoute>
          <label id="productLabel">Filtruj po Rodzaju: </label>
          <select id="productType" value={selectedType} onChange={handleTypeChange}>
            <option value="">Wszystkie</option>
            {options}
          </select>
        </section>
          <BasicTable data={products} columns={productColumns} URL={PRODUCT_LIST} IdType="productId" canDelete="PERM_DELETE_PRODUCTS" />
        </section>
      </div>
    </>
  );
}

export default ItemsPage;
