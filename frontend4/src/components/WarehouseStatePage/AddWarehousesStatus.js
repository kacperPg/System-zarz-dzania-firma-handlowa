import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
import { Link,useNavigate   } from "react-router-dom";
const WAREHOUSESTATUS_LIST = '/api/warehousesStatus';
const PRODUCT_LIST = '/api/products';
const WAREHOUSE_LIST = '/api/warehouses';

function AddWarehousesStatus() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [warehouseId, setwarehouseId] = useState('');
  const [availableQuantity, setavailableQuantity] = useState('');
  const [soldQuantity, setsoldQuantity] = useState('');
  const [productId, setproductId] = useState('');
  let token = sessionStorage.getItem('token');
  const navigate  = useNavigate();
  const [products, setProducts] = useState([]);
  const [warehouse, setwarehouse] = useState([]);

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
        const response = await axios.post(WAREHOUSESTATUS_LIST,
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
    <>
       <button onClick={handleShow} id="buttonItem">
           Dodaj Nowy stan
          </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj stan magazynu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Magazyn</Form.Label>
              <Form.Select       
              autoFocus
                 onChange={(e) => setwarehouseId(e.target.value)}
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
                 onChange={(e) => setproductId(e.target.value)}
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
            Dodaj Stan Magazynu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddWarehousesStatus;