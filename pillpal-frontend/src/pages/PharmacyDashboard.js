import React, { useState, useEffect } from "react";
import axios from "axios";

const PharmacyDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [restockQuantities, setRestockQuantities] = useState({});
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/medicines");
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sales");
        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const handleRestock = async (medicineId) => {
    const quantity = parseInt(restockQuantities[medicineId]) || 0;
    if (quantity <= 0) return;

    try {
      await axios.put(`http://localhost:5000/api/medicines/${medicineId}`, {
        stock: quantity,
      });
      alert("Restock successful!");
      setRestockQuantities((prev) => ({ ...prev, [medicineId]: 0 }));
    } catch (error) {
      console.error("Error restocking medicine:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Pharmacy Dashboard</h2>

      <section style={styles.section}>
        <h3>Available Medicines</h3>
        <div style={styles.grid}>
          {medicines.map((medicine) => (
            <div key={medicine._id} style={styles.card}>
              <h4>{medicine.name}</h4>
              <p>{medicine.description}</p>
              <p><strong>Price:</strong> ₹{medicine.price}</p>
              <p><strong>Stock:</strong> {medicine.stock}</p>
              <div style={styles.restockContainer}>
                <input
                  type="number"
                  placeholder="Restock Quantity"
                  value={restockQuantities[medicine._id] || ""}
                  onChange={(e) =>
                    setRestockQuantities((prev) => ({
                      ...prev,
                      [medicine._id]: e.target.value,
                    }))
                  }
                  style={styles.input}
                />
                <button
                  onClick={() => handleRestock(medicine._id)}
                  style={styles.button}
                >
                  Restock
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h3>Sales Data</h3>
        <div style={styles.grid}>
          {salesData.map((sale) => (
            <div key={sale.medicineId} style={{ ...styles.card, background: "#f9f3ff" }}>
              <h4>{sale.medicineName}</h4>
              <p><strong>Quantity Sold:</strong> {sale.quantitySold}</p>
              <p><strong>Total Revenue:</strong> ₹{sale.totalRevenue}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "32px",
    color: "#333",
  },
  section: {
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  },
  restockContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 16px",
    background: "#00b894",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default PharmacyDashboard;
