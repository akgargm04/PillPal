// src/pages/OrderHistory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = ({ buyerId }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${buyerId}`);
        setOrders(response.data);
      } catch (error) {
        setError('Error fetching orders.');
      }
    };

    if (buyerId) {
      fetchOrders();
    }
  }, [buyerId]);

  return (
    <div>
      <h2>Order History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.status}</p>
              <p>Total Price: ₹{order.totalPrice}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item.medicineId._id}>
                    {item.medicineId.name} - {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
                  </li>
                ))}
              </ul>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
