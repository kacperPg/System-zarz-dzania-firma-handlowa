import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
const WAREHOUSE_LIST = '/api/warehouses';

function EditWareHouse({ Id, handleClose }) {
  const [warehouseName, setwarehouseName] = useState('');
  const [location, setlocation] = useState('');
  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${WAREHOUSE_LIST}/${Id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        const WarehouseData = res.data;
        setlocation(WarehouseData.location);
        setwarehouseName(WarehouseData.warehouseName)
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
          `${WAREHOUSE_LIST}/${Id}`,
            JSON.stringify({ warehouseName,location}),
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
  return (
        <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Magazyn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" disabled={true} controlId="exampleForm.ControlInput1">
              <Form.Label>Nazwa Magazynu</Form.Label>
              <Form.Control
                type="text"
                disabled={true} 
                placeholder="Nazwa Magaznu"
                autoFocus
                onChange={(e) => setwarehouseName(e.target.value)}
                value={warehouseName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Lokalizacja</Form.Label>
              <Form.Control
                type="text"
                placeholder="Lokalizacja Magaznu"
                autoFocus
                onChange={(e) => setlocation(e.target.value)}
                value={location}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Zamknij
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Edit Magazyn
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditWareHouse;