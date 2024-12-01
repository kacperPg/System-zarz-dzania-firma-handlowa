import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import { useAuth } from '../AuthProvider';
import '../ItemsPage.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';

function EditOrderPage() {
  const { orderId } = useParams();
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
  const [warehouseId, setWarehouseId] = useState('');
  const [orderItemId, setOrderItemId] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [productName, setProductName] = useState('');
  const [warehouseName, setWarehouseName] = useState('');

  const token = auth.accessToken; // Corrected token access

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, token]);

  useEffect(() => {
    fetchClients();
    fetchProducts();
    fetchWarehouses();
  }, [token]);

  const fetchClients = async () => {
    try {
      const response = await axios.get('/api/clients', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('/api/warehouses', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const formattedOrder = {
        ...response.data,
        orderDate: new Date(response.data.orderDate.join('-')).toISOString().split('T')[0],
        paymentDate: new Date(response.data.paymentDate.join('-')).toISOString().split('T')[0]
      };

      setOrder(formattedOrder);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderToSubmit = {
      ...order,
      orderItems: order.orderItems.map(({orderItemId, productId, quantity, warehouseId }) => ({
        orderItemId,
        productId,
        quantity,
        warehouseId,
      }))
    };
    try {
      const response = await axios.put(`/api/orders/${orderId}`, orderToSubmit, {
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
    if (productId === '' || quantity === '' || warehouseId === '') {
      alert('Wszystkie pola muszą być wypełnione.');
      return;
    }

    const duplicateItem = order.orderItems.find(
      (item) => item.productId === productId && item.warehouseId === warehouseId
    );

    if (duplicateItem) {
      alert('Produkt z tego samego magazynu jest już w zamówieniu.');
      return;
    }

    const newItem = {
      productId,
      quantity,
      warehouseId,
      productName,
      warehouseName,
    };

    setOrder({ ...order, orderItems: [...order.orderItems, newItem] });
    setProductId('');
    setQuantity('');
    setWarehouseId('');
    handleClose();
  };

  const handleEditSubmit = () => {
    if (productId === '' || quantity === '' || warehouseId === '') {
      alert('Wszystkie pola muszą być wypełnione.');
      return;
    }

    const duplicateItem = order.orderItems.find(
      (item) => item.productId === productId && item.warehouseId === warehouseId && item !== editItem
    );

    const updatedItems = order.orderItems.map(item =>
      item === editItem
        ? {
            ...item,
            orderItemId,
            productId,
            quantity,
            warehouseId,
            productName,
            warehouseName,
          }
        : item
    );

    setOrder({ ...order, orderItems: updatedItems });
    setProductId('');
    setQuantity('');
    setWarehouseId('');
    setEditItem(null);
    handleEditClose();
  };

  const handleEditRow = (item) => {
    setEditItem(item);
    setProductId(item.productId);
    setQuantity(item.quantity);
    setWarehouseId(item.warehouseId);
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
    <option key={type.warehouseId} value={type.warehouseId}>{type.warehouseName}</option>
  ));

  return (
    <div className="wrapper">
    <NavBarBoodstrap />
    <section id="idTabelaProduktow">
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
            <label className="label">Data złożenia zamówienia:  </label>
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
              <option value="PENDING">OCZEKUJĄCE</option>
              <option value="PROCESSING">PRZETWARZANE</option>
              <option value="SHIPPED">WYSYŁANE</option>
              <option value="DELIVERED">DOSTARCZANE</option>
              <option value="CANCELLED">ANULOWANE</option>
            </select>
          </div>
          <div>
            <label className="label">Data zapłaty za zamówienie: </label>
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
                        onChange={(e) => {
                          setProductId(e.target.value);
                          setProductName(e.target.options[e.target.selectedIndex].text);
                        }}                        
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
                        onChange={(e) => {
                          setWarehouseId(e.target.value);
                          setWarehouseName(e.target.options[e.target.selectedIndex].text);
                        }}
                        value={warehouseId}>
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
                    <th>Nazwa Produktu</th>
                    <th>Ilość</th>
                    <th>Nazwa Magazynu</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                 <td>{item.productName}</td> {/* Display product name here */}
                  <td>{item.quantity}</td>
                      <td>{item.warehouseName}</td>
                      <td>
                
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
            Zaktualizuj zamówienie
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
                onChange={(e) => {
                  setProductId(e.target.value);
                  setProductName(e.target.options[e.target.selectedIndex].text);
                }}        
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
                onChange={(e) => {
                  setWarehouseId(e.target.value);
                  setWarehouseName(e.target.options[e.target.selectedIndex].text);
                }}
                value={warehouseId}>
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

export default EditOrderPage ;
