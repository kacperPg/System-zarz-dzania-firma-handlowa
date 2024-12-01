import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
import Cookies from 'js-cookie';  

const CLIENT_LIST = '/api/clients';


function EditClient({ Id, handleClose }) {
  const [clientName, setClientName] = useState('');
  const [nipNumber, setNIP] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const token = Cookies.get('token');

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${CLIENT_LIST}/${Id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        const productData = res.data;
        setClientName(productData.clientName);
        setNIP(productData.nipNumber);
        setPhoneNumber(productData.phoneNumber);
        setAddress(productData.address);
        setClientEmail(productData.clientEmail);
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
        `${CLIENT_LIST}/${Id}`,
        JSON.stringify({ clientName: clientName, nipNumber: nipNumber,phoneNumber, address, clientEmail}),
        {
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }
        }
      );
      handleClose(); // Close the modal after successful submit
      navigate('/UserPage');
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


  return (
    <Modal show={true} onHide={handleClose}>
     <Modal.Header closeButton>
          <Modal.Title>Dodaj Klienta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nazwa Klienta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nazwa Klienta"
                autoFocus
                onChange={(e) => setClientName(e.target.value)}
                value={clientName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>NIP</Form.Label>
              <Form.Control
                 type="number"
                 placeholder=""
                 autoFocus
                 onChange={(e) => setNIP(e.target.value)}
                 value={nipNumber}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Numer Telefonu</Form.Label>
              <Form.Control
                  type="text"
                 placeholder=""
                 autoFocus
                 onChange={(e) => setPhoneNumber(e.target.value)}
                 value={phoneNumber}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Adress</Form.Label>
              <Form.Control
                type="text"
                placeholder="Adres"
                autoFocus
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                autoFocus
                onChange={(e) => setClientEmail(e.target.value)}
                value={clientEmail
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Zamknij
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Dodaj Klienta
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditClient;