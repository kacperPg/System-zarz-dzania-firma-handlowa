import { useEffect, useState } from 'react';
import AddWarehousesStatus from './AddWarehousesStatus';
import BasicTable from '../BasicTable';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import axios from '../../api/axios';
import '../ItemsPage.css';

const WAREHOUSESTATUS_LIST = '/api/warehousesStatus';
const PRODUCT_LIST = '/api/products';
const WAREHOUSE_LIST = '/api/warehouses';
const SEARCH_WAREHOUSESTATUS = '/api/warehousesStatus/search';

function WarehousesStatusPage() {
  const [warehouseStatus, setWarehouseStatus] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, productsRes, warehousesRes] = await Promise.all([
          axios.get(WAREHOUSESTATUS_LIST, { headers: { 'Authorization': 'Bearer ' + token } }),
          axios.get(PRODUCT_LIST, { headers: { 'Authorization': 'Bearer ' + token } }),
          axios.get(WAREHOUSE_LIST, { headers: { 'Authorization': 'Bearer ' + token } }),
        ]);
        setWarehouseStatus(statusRes.data);
        setProducts(productsRes.data);
        setWarehouses(warehousesRes.data);
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
    fetchData();
  }, [token]);

  const handleFilterChange = async () => {
    
    if (selectedProduct === '' && selectedWarehouse === '') {
      const res = await axios.get(WAREHOUSESTATUS_LIST, {
        headers: { 'Authorization': 'Bearer ' + token },
      });
      setWarehouseStatus(res.data);
    } else {
    try {
      const res = await axios.get(SEARCH_WAREHOUSESTATUS, {
        headers: { 'Authorization': 'Bearer ' + token },
        params: {
          productName: selectedProduct || undefined,
          warehouseName: selectedWarehouse || undefined,
        },
      });
      setWarehouseStatus(res.data);
    } catch (err) {
      console.error('Error fetching filtered warehouse status:', err);
    }}
  };

  const productColumns = [
    { header: 'Nazwa Magazynu', accessorKey: 'warehouseName' },
    { header: 'Dostępna ilość', accessorKey: 'availableQuantity' },
    { header: 'Sprzedana ilość', accessorKey: 'soldQuantity' },
    { header: 'Produkt', accessorKey: 'productName' },
  ];

  return (
    <>
      <div className="wrapper">
        <NavBarBoodstrap />
        <section id="buttonAddProduct">
          <AddWarehousesStatus />

          <label id="productLabel">Filter by Product: </label>
          <select
            id="productFilter"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">All</option>
            {products.map((product) => (
              <option key={product.productName} value={product.productName}>
                {product.productName}
              </option>
            ))}
          </select>
          <label id="productLabel">Filter by Warehouse: </label>
          <select
            id="warehouseFilter"
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
          >
            <option value="">All</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.warehouseName} value={warehouse.warehouseName}>
                {warehouse.warehouseName}
              </option>
            ))}
          </select>
          <button id="filterButton" onClick={handleFilterChange}>Filter</button>
        </section>
        <section id="idTabelaProduktow">
          <BasicTable data={warehouseStatus} columns={productColumns} URL={WAREHOUSESTATUS_LIST} IdType="warehouseStatusId" />
        </section>
      </div>
    </>
  );
}

export default WarehousesStatusPage;