import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
import Cookies from 'js-cookie';  

const WAREHOUSESTATUS_LIST = '/api/warehousesStatus';
const PRODUCT_LIST = '/api/products';
const WAREHOUSE_LIST = '/api/warehouses';

function EditWarehousesStatus({ Id, handleClose }) {
  const [warehouseId, setwarehouseName] = useState('');
  const [availableQuantity, setavailableQuantity] = useState('');
  const [soldQuantity, setsoldQuantity] = useState('');
  const [productId, setproductName] = useState('');
  const token = Cookies.get('token');
  const [products, setProducts] = useState([]);
  const [warehouse, setwarehouse] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${WAREHOUSESTATUS_LIST}/${Id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        const productData = res.data;
        setwarehouseName(productData.warehouseId);
        setavailableQuantity(productData.availableQuantity);
        setsoldQuantity(productData.soldQuantity);
        setproductName(productData.productId);
      } catch (err) {
        console.error('Error fetching product:', err);
        if (!err?.response) {
          alert('No Server Response');
        } else if (err.response?.status === 401) {
          alert('Error');
        } else {
          alert('Failed');
        }
      }
    };
    getProduct();
  }, [Id, token]);

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

useEffect(() => {
    const getWarehouse = async () => {
      try {
        const res = await axios.get(WAREHOUSE_LIST,
          {
            headers: {  'Authorization': 'Bearer ' +  token
          }
        }
        );
        setwarehouse(res.data);
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
    getWarehouse();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        const response = await axios.put(`${WAREHOUSESTATUS_LIST}/${Id}`,
            JSON.stringify({  warehouseId,availableQuantity,soldQuantity , productId}),
            {
              headers: {  'Content-Type': 'application/json',
               'Authorization': 'Bearer ' +  token}
            }
        );
        window.location.reload();
    } catch (err) {
        if (!err?.response) {
          alert('No Server Response');
        }  else if (err.response?.status === 401) {
          alert('Unauthorized');
        } else {
             alert('Failed');
        }
    }
}
const produkctList = products.map(type => (
  <option key={type.productId} value={type.productId}>{type.productName}</option>
));

const warehousetList = warehouse.map(type => (
  <option key={type.warehouseId} value={type.warehouseId}>{type.warehouseName}</option>
));

  return (
    <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj stan magazynu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Magazyn</Form.Label>
              <Form.Select       
              autoFocus
                 onChange={(e) => setwarehouseName(e.target.value)}
                 value={warehouseId}>
                  <option value={''}>wybierz magazyn</option> {/* Default option */}
                {warehousetList}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Dostępna ilość</Form.Label>
              <Form.Control
                type="number"
                placeholder="Dostępna ilość"
                autoFocus
                onChange={(e) => setavailableQuantity(e.target.value)}
                value={availableQuantity}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Sprzedana ilość</Form.Label>
              <Form.Control
                type="number"
                placeholder="Sprzedana ilość"
                autoFocus
                onChange={(e) => setsoldQuantity(e.target.value)}
                value={soldQuantity}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Produkt</Form.Label>
              <Form.Select       
              autoFocus
                 onChange={(e) => setproductName(e.target.value)}
                 value={productId}>
              <option value={''}>wybierz produkt</option> {/* Default option */}
                {produkctList}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Zamknij
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Edytuj Stan Magazyn
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditWarehousesStatus;