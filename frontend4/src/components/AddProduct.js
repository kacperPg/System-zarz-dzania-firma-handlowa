import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../api/axios';
import { Link,useNavigate   } from "react-router-dom";
const PRODUCT_LIST = '/api/products';

function AddProduct() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [typeId, setTypeId] = useState('');
  let token = sessionStorage.getItem('token');
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(PRODUCT_LIST,
            JSON.stringify({ productName, price,typeId }),
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
           Dodaj Produkt
          </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj Przedmiot</Modal.Title>
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
              <Form.Control
                 type="number"
                 placeholder="1"
                 autoFocus
                 onChange={(e) => setTypeId(e.target.value)}
                 value={typeId}
              />
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
            Dodaj Produkt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProduct;