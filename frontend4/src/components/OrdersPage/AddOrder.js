import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import { useAuth } from '../AuthProvider';
import '../ItemsPage.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const AddOrderPage = () => {
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const handleClose = () => setShow(false);
  const handleEditClose = () => setEditShow(false);
  const handleShow = (event) => {
    event.preventDefault();
    setShow(true);
  };

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    clientId: '',
    orderDate: '',
    status: '',
    paymentDate: '',
    orderItems: []
  });
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [warehouseID, setWarehouseId] = useState('');
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetchClients();
    fetchProducts();
    fetchWarehouses();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('/api/clients', {
        headers: { 'Authorization': `Bearer ${auth.accessToken}` },
      });
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products', {
        headers: { 'Authorization': `Bearer ${auth.accessToken}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('/api/warehouses', {
        headers: { 'Authorization': `Bearer ${auth.accessToken}` },
      });
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/orders', order, {
        headers: { 'Authorization': `Bearer ${auth.accessToken}` },
      });
      console.log('Order added:', response.data);
      navigate(`/Order/${response.data.orderId}`);
    } catch (err) {
      if (!err?.response) {
        alert('No Server Response');
      } else if (err.response?.status === 401) {
        alert('Unauthorized');
      } else {
        alert('Nie udało się dodać zamówienia');
      }
    }
  };

  const handleSubmitItem = () => {
    if (productId === '' || quantity === '' || warehouseID === '') {
      alert('Wszystkie pola muszą być wypełnione.');
      return;
    }

    const duplicateItem = order.orderItems.find(
      (item) => item.productId === productId && item.warehouseName === warehouseID
    );

    if (duplicateItem) {
      alert('Produkt z tego samego magazynu jest już w zamówieniu.');
      return;
    }

    const newItem = { productId: productId, quantity: quantity, warehouseName: warehouseID };
    setOrder({ ...order, orderItems: [...order.orderItems, newItem] });
    handleClose();
  };

  const handleEditSubmit = () => {
    if (productId === '' || quantity === '' || warehouseID === '') {
      alert('Wszystkie pola muszą być wypełnione.');
      return;
    }

    const duplicateItem = order.orderItems.find(
      (item) => item.productId === productId && item.warehouseName === warehouseID && item !== editItem
    );

    if (duplicateItem) {
      alert('Produkt z tego samego magazynu jest już w zamówieniu.');
      return;
    }

    const updatedItems = order.orderItems.map(item =>
      item.productId === editItem.productId && item.warehouseName === editItem.warehouseName
        ? { ...item, quantity: quantity, warehouseName: warehouseID }
        : item
    );

    setOrder({ ...order, orderItems: updatedItems });
    handleEditClose();
  };

  const handleEditRow = (item) => {
    setEditItem(item);
    setProductId(item.productId);
    setQuantity(item.quantity);
    setWarehouseId(item.warehouseName);
    setEditShow(true);
  };

  const handleDeleteRow = (itemId) => {
    setOrder({
      ...order,
      orderItems: order.orderItems.filter(item => item.productId !== itemId)
    });
  };

  const optionsProducts = products.map(type => (
    <option key={type.productId} value={type.productId}>{type.productName}</option>
  ));

  const optionsWarehouse = warehouses.map(type => (
    <option key={type.warehouseName} value={type.warehouseName}>{type.warehouseName}</option>
  ));
  
  return (
    <div className="wrapper">
      <NavBarBoodstrap />
      <section id="buttonAddProduct">
        <form>
          <div>
            <label className="label">Klient:</label>
            <select name="clientId" value={order.clientId} onChange={handleInputChange}>
              <option value="">Wybierz Klienta</option>
              {clients.map((client) => (
                <option key={client.clientId} value={client.clientId}>
                  {client.clientName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Data złożenia zamówiena:</label>
            <input
              type="date"
              name="orderDate"
              value={order.orderDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="label">Status:</label>
            <select name="status" value={order.status} onChange={handleInputChange}>
              <option value="">Wybierz status</option>
              <option value="PENDING">PENDING</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
          <div>
            <label className="label">Data zapłaty za zamówienie:</label>
            <input
              type="date"
              name="paymentDate"
              value={order.paymentDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <>
              <button type="button" onClick={handleShow} id="buttonItem">
                Dodaj Produkt
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Dodaj zamówiony przedmiot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Rodzaj</Form.Label>
                      <Form.Select
                        autoFocus
                        onChange={(e) => setProductId(e.target.value)}
                        value={productId}>
                        <option value={''}>Select Type</option>
                        {optionsProducts}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Ilość</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""
                        autoFocus
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Magazyn</Form.Label>
                      <Form.Select
                        autoFocus
                        onChange={(e) => setWarehouseId(e.target.value)}
                        value={warehouseID}>
                        <option value={''}>Select Type</option>
                        {optionsWarehouse}
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Zamknij
                  </Button>
                  <Button variant="primary" onClick={handleSubmitItem}>
                    Dodaj Produkt
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </div>
          <div>
            <section id="Info">
              <label className="label">Zamówione przedmioty:</label>
              <table className="table">
                <thead>
                  <tr>
                    <th>Produkt Id</th>
                    <th>Ilość</th>
                    <th>Magazyn ID</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productId}</td>
                      <td>{item.quantity}</td>
                      <td>{item.warehouseName}</td>
                      <td>
                        <button type="button" onClick={() => handleEditRow(item)}>
                          Edytuj
                        </button>
                        </td>
                        <td>
                        <button type="button" onClick={() => handleDeleteRow(item.productId)}>
                          Usuń
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
          <button type="submit" onClick={handleSubmit} id="buttonItem">
            Submit Order
          </button>
        </form>
      </section>

      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit zamówiony przedmiot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="editForm.ControlInput1">
              <Form.Label>Rodzaj</Form.Label>
              <Form.Select
                autoFocus
                onChange={(e) => setProductId(e.target.value)}
                value={productId}>
                <option value={''}>Select Type</option>
                {optionsProducts}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="editForm.ControlInput1">
              <Form.Label>Ilość</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                autoFocus
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editForm.ControlInput1">
              <Form.Label>Magazyn</Form.Label>
              <Form.Select
                autoFocus
                onChange={(e) => setWarehouseId(e.target.value)}
                value={warehouseID}>
                <option value={''}>Select Type</option>
                {optionsWarehouse}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Zamknij
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Zaktualizuj Produkt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddOrderPage;
