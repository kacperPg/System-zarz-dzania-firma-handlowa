import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
import Cookies from 'js-cookie';  

const PRODUCT_LIST = '/api/products';
const TYPE_LIST = '/api/productTypes';

function EditProduct({ Id, handleClose }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [typeId, setTypeId] = useState('');
  const [types, setTypes] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${PRODUCT_LIST}/${Id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        const productData = res.data;
        setProductName(productData.productName);
        setPrice(productData.price);
        setTypeId(productData.typeId);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${PRODUCT_LIST}/${Id}`,
        JSON.stringify({ productName, price, typeId }),
        {
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }
        }
      );
      handleClose(); // Close the modal after successful submit
      window.location.reload();
    } catch (err) {
      console.error('Error editing product:', err);
      if (!err?.response) {
        alert('No Server Response');
      } else if (err.response?.status === 401) {
        alert('Unauthorized');
      } else {
        alert('Failed');
      }
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(TYPE_LIST, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setTypes(res.data);
      } catch (err) {
        console.error('Error fetching product types:', err);
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

  const options = types.map((type) => (
    <option key={type.typeId} value={type.typeId}>
      {type.typeName}
    </option>
  ));

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edytuj Przedmiot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nazwa Produktu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Kod Produktu"
              autoFocus
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Rodzaj Id</Form.Label>
            <Form.Select autoFocus onChange={(e) => setTypeId(e.target.value)} value={typeId}>
              <option value={''}>Select Type</option> {/* Default option */}
              {options}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Cena Produktu</Form.Label>
            <Form.Control
              type="number"
              placeholder="$$$"
              autoFocus
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Zamknij
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Edytuj Produkt
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProduct;