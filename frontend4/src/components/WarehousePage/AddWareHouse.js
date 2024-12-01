import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
import { Link,useNavigate   } from "react-router-dom";
import Cookies from 'js-cookie';  

const WAREHOUSE_LIST = '/api/warehouses';

function AddWareHouse() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [warehouseName, setwarehouseName] = useState('');
  const [location, setlocation] = useState('');
  const token = Cookies.get('token');
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(WAREHOUSE_LIST,
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
    <>
       <button onClick={handleShow} id="buttonItem">
           Dodaj Magazyn
          </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj Magazyn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nazwa Magazynu</Form.Label>
              <Form.Control
                type="text"
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
            Dodaj Magazyn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddWareHouse;