import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
import { Link,useNavigate   } from "react-router-dom";
import Cookies from 'js-cookie';  
const USER_LIST = '/api/users';
const USER_REGEX = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-z0-9-_]{1,23}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function AddUser() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = Cookies.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        const response = await axios.post(USER_LIST,
            JSON.stringify({ name,lastName,email, password}),
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
           Dodaj Usera
          </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj nowego Usera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Imię </Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                value={productName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Imię </Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                value={productName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nazwisko </Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                autoFocus
                onChange={(e) => setLastName(e.target.value)}
                value={productName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hasło </Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                value={productName}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Zamknij
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Dodaj Magazyn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUser;