import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SellerDashboard = () => {
  const { token } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    description: '',
    price: '',
    category: 'painkillers',
    stock: '',
    expiryDate: '',
    quantity: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/medicines/seller", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
        setError("Failed to fetch medicines.");
      }
    };

    if (token) fetchMedicines();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        "http://localhost:5000/api/medicines",
        newMedicine,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMedicines([...medicines, response.data]);
      setNewMedicine({
        name: '',
        description: '',
        price: '',
        category: 'painkillers',
        stock: '',
        expiryDate: '',
        quantity: '',
      });
      setSuccess("Medicine added successfully!");
    } catch (error) {
      console.error("Error adding medicine:", error);
      const errMsg = error?.response?.data?.message || "Failed to add medicine.";
      setError(errMsg);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Seller Dashboard</h2>

      <div style={styles.formContainer}>
        <h3 style={styles.subHeader}>Add New Medicine</h3>
        <form onSubmit={handleAddMedicine} style={styles.form}>
          <input
            type="text"
            name="name"
            value={newMedicine.name}
            onChange={handleInputChange}
            placeholder="Medicine Name"
            required
            style={styles.input}
          />
          <textarea
            name="description"
            value={newMedicine.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            style={styles.textarea}
          />
          <input
            type="number"
            name="price"
            value={newMedicine.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
            style={styles.input}
          />
          <input
            type="number"
            name="stock"
            value={newMedicine.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            required
            style={styles.input}
          />
          <input
            type="date"
            name="expiryDate"
            value={newMedicine.expiryDate}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <input
            type="number"
            name="quantity"
            value={newMedicine.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            required
            style={styles.input}
          />
          <select
            name="category"
            value={newMedicine.category}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="painkillers">Painkillers</option>
            <option value="antibiotics">Antibiotics</option>
            <option value="vitamins">Vitamins</option>
          </select>
          <button type="submit" style={styles.button}>Add Medicine</button>
        </form>
        {success && <p style={styles.successMsg}>{success}</p>}
        {error && <p style={styles.errorMsg}>{error}</p>}
      </div>

      <h3 style={styles.subHeader}>Your Medicines</h3>
      <div style={styles.medicineContainer}>
        {medicines.length === 0 ? (
          <p style={styles.emptyMsg}>No medicines added yet.</p>
        ) : (
          medicines.map((medicine) => (
            <div key={medicine._id} style={styles.medicineCard}>
              <h4 style={styles.medicineTitle}>{medicine.name}</h4>
              <p style={styles.medicineDescription}>{medicine.description}</p>
              <p><strong>Price:</strong> ₹{medicine.price}</p>
              <p><strong>Stock:</strong> {medicine.stock}</p>
              <p><strong>Expiry Date:</strong> {medicine.expiryDate}</p>
              <p><strong>Quantity:</strong> {medicine.quantity}</p>
              <div style={styles.actions}>
                <button style={styles.editButton}>Edit</button>
                <button style={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#333',
  },
  header: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#007bff',
  },
  subHeader: {
    fontSize: '1.5rem',
    fontWeight: '500',
    marginBottom: '15px',
    color: '#444',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '60%',
    marginBottom: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '100px',
  },
  select: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  successMsg: {
    color: 'green',
    textAlign: 'center',
    fontSize: '16px',
    marginTop: '15px',
  },
  errorMsg: {
    color: 'red',
    textAlign: 'center',
    fontSize: '16px',
    marginTop: '15px',
  },
  medicineContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '80%',
  },
  emptyMsg: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
  },
  medicineCard: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
  },
  medicineCardHover: {
    transform: 'scale(1.05)',
  },
  medicineTitle: {
    fontSize: '1.25rem',
    fontWeight: '500',
    color: '#007bff',
  },
  medicineDescription: {
    fontSize: '16px',
    color: '#555',
  },
  actions: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    padding: '8px 12px',
    backgroundColor: '#ffcc00',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default SellerDashboard;
