import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewOrderForm = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    clientId: '',
    totalAmount: 0,
    orderDate: '',
    status: '',
    paymentDate: '',
    totalPrice: 0,
    orderItems: [{ productId: '', quantity: 0, warehouseName: '' }]
  });

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products'); // Adjust API endpoint as necessary
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleOrderItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedOrderItems = order.orderItems.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setOrder({ ...order, orderItems: updatedOrderItems });
  };

  const addOrderItem = () => {
    setOrder({
      ...order,
      orderItems: [...order.orderItems, { productId: '', quantity: 0, warehouseName: '' }]
    });
  };

  const removeOrderItem = (index) => {
    const updatedOrderItems = order.orderItems.filter((_, i) => i !== index);
    setOrder({ ...order, orderItems: updatedOrderItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/orders', order);
      console.log('Order added:', response.data);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Client:</label>
        <select name="clientId" value={order.clientId} onChange={handleInputChange}>
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.clientId} value={client.clientId}>
              {client.clientName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Total Amount:</label>
        <input
          type="number"
          name="totalAmount"
          value={order.totalAmount}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Order Date:</label>
        <input
          type="date"
          name="orderDate"
          value={order.orderDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <input type="text" name="status" value={order.status} onChange={handleInputChange} />
      </div>
      <div>
        <label>Payment Date:</label>
        <input
          type="date"
          name="paymentDate"
          value={order.paymentDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Total Price:</label>
        <input
          type="number"
          name="totalPrice"
          value={order.totalPrice}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Order Items:</label>
        {order.orderItems.map((item, index) => (
          <div key={index}>
            <select
              name="productId"
              value={item.productId}
              onChange={(e) => handleOrderItemChange(index, e)}
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.productId} value={product.productId}>
                  {product.productName}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleOrderItemChange(index, e)}
              placeholder="Quantity"
            />
            <input
              type="text"
              name="warehouseName"
              value={item.warehouseName}
              onChange={(e) => handleOrderItemChange(index, e)}
              placeholder="Warehouse Name"
            />
            <button type="button" onClick={() => removeOrderItem(index)}>
              Remove Item
            </button>
          </div>
        ))}
        <button type="button" onClick={addOrderItem}>
          Add Item
        </button>
      </div>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default NewOrderForm;