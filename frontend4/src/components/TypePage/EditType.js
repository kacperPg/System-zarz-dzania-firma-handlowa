import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
import { Link,useNavigate   } from "react-router-dom";
import Cookies from 'js-cookie';  
const TYPE_LIST = '/api/productTypes';

function EditType({ Id, handleClose }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [typeName, settypeName] = useState('');
  const token = Cookies.get('token');
  const navigate  = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${TYPE_LIST}/${Id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        const productData = res.data;
        settypeName(productData.typeName);
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
        `${TYPE_LIST}/${Id}`,
        JSON.stringify({ typeName}),
            {
              headers: {  'Content-Type': 'application/json',
               'Authorization': 'Bearer ' +  token}
            }
        );
        handleClose(); // Close the modal after successful submit
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
          <Modal.Title>Edytuj Rodzaj</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nazwa Rodzaju</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kod Produktu"
                autoFocus
                onChange={(e) => settypeName(e.target.value)}
                value={typeName}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Zamknij
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
          Edytuj Rodzaj
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditType;