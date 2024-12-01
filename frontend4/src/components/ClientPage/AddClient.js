import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
import Cookies from 'js-cookie';  

const CLIENT_LIST = '/api/clients';

function AddClient() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [clientName, setClientName] = useState('');
  const [nipNumber, setNIP] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const token = Cookies.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(CLIENT_LIST,
            JSON.stringify({ clientName: clientName, nipNumber: nipNumber,phoneNumber, address, clientEmail}),
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
    <>
       <button onClick={handleShow} id="buttonItem">
           Dodaj Klienta
          </button>

      <Modal show={show} onHide={handleClose}>
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
                 type="number"
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
    </>
  );
}

export default AddClient;