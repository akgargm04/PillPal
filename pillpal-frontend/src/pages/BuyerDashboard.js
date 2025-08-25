import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BuyerDashboard = () => {
  const { user, token, cart, updateCart, logout } = useAuth();
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token && user) {
      const fetchData = async () => {
        try {
          // Attempt to fetch medicines from the backend
          const response = await axios.get("http://localhost:5000/api/medicines", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setMedicines(response.data);
          setFilteredMedicines(response.data);
        } catch (err) {
          // If an error occurs, log it and handle accordingly
          console.error("Error fetching data:", err.response || err.message);
          setError("Failed to load dashboard data.");
          if (err.response && err.response.status === 401) {
            // If token expired or unauthorized, logout and redirect to login page
            logout();
            navigate("/login");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      // If no token or user, show login prompt
      setLoading(false);
      setError("User not authenticated!");
      logout();
      navigate("/login");
    }
  }, [token, user, logout, navigate]);

  // Handle medicine filtering based on search and other criteria
  useEffect(() => {
    let filtered = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== "all") {
      filtered = filtered.filter((medicine) => medicine.category === category);
    }
    filtered = filtered.filter(
      (medicine) => medicine.price >= priceRange[0] && medicine.price <= priceRange[1]
    );
    setFilteredMedicines(filtered);
  }, [search, category, priceRange, medicines]);

  // Handle adding an item to the cart
  const addToCart = (medicine) => {
    const exists = cart.find((item) => item._id === medicine._id);
    let newCart;
    if (exists) {
      newCart = cart.map((item) =>
        item._id === medicine._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...medicine, quantity: 1 }];
    }
    updateCart(newCart);
  };

  // Handle removing an item from the cart
  const removeFromCart = (id) =>
    updateCart(cart.filter((item) => item._id !== id));

  // Handle quantity updates for an item in the cart
  const updateQuantity = (id, delta) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  // Calculate total price of items in the cart
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle checkout process
  const checkout = async () => {
    if (!user || !user._id || cart.length === 0 || !token) return;

    try {
      const payload = {
        buyerId: user._id,
        items: cart.map((i) => ({
          medicineId: i._id,
          quantity: i.quantity,
          price: i.price,
        })),
        totalPrice: total,
      };

      // Send checkout request to the backend
      await axios.post("http://localhost:5000/api/orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Order placed successfully!");
      updateCart([]); // Clear cart after successful order
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Order failed.");
    }
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Medicines</h2>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="painkillers">Painkillers</option>
        <option value="antibiotics">Antibiotics</option>
        <option value="vitamins">Vitamins</option>
      </select>
      <input
        type="range"
        min="0"
        max="1000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
      />
      <span>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</span>

      <div>
        {filteredMedicines.map((medicine) => (
          <div key={medicine._id} style={{ marginBottom: "10px" }}>
            <h3>{medicine.name}</h3>
            <p>Price: ₹{medicine.price}</p>
            <button onClick={() => addToCart(medicine)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h3>Cart</h3>
      <ul>
        {cart.map((item) => (
          <li key={item._id}>
            {item.name} - ₹{item.price} x {item.quantity}
            <button onClick={() => updateQuantity(item._id, 1)}>+</button>
            <button onClick={() => updateQuantity(item._id, -1)}>-</button>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div>Total: ₹{total}</div>
      <button onClick={checkout} disabled={cart.length === 0}>
        Checkout
      </button>
    </div>
  );
};

export default BuyerDashboard;
