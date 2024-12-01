import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
import { Link,useNavigate   } from "react-router-dom";
import Cookies from 'js-cookie';  
const TYPE_LIST = '/api/productTypes';

function AddType() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [typeName, settypeName] = useState('');
  const token = Cookies.get('token');
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(TYPE_LIST,
            JSON.stringify({ typeName}),
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
           Dodaj Rodzaj
          </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj Rodzaj</Modal.Title>
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
            Dodaj Rodzaj
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddType;