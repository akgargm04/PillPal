const Cart = require("../models/Cart");
const Medicine = require("../models/Medicine");
// 🔹 Add medicine to cart
exports.addToCart = async (req, res) => {
    try {
      const { medicineId, quantity } = req.body;
  
      const medicine = await Medicine.findById(medicineId);
  
      if (!medicine || medicine.status !== "approved") {
        return res.status(400).json({ message: "Medicine not available" });
      }
  
      const today = new Date();
  
      if (medicine.expiryDate < today) {
        return res.status(400).json({ message: "Medicine is expired" });
      }
  
      if (quantity > medicine.quantity) {
        return res.status(400).json({ message: "Quantity exceeds stock" });
      }
  
      let cart = await Cart.findOne({ user: req.user._id });
  
      // create cart if not exists
      if (!cart) {
        cart = await Cart.create({
          user: req.user._id,
          items: [{ medicine: medicineId, quantity }],
        });
      } else {
        const existingItem = cart.items.find(
          (item) => item.medicine.toString() === medicineId
        );
  
        if (existingItem) {
          existingItem.quantity = quantity;
        } else {
          cart.items.push({ medicine: medicineId, quantity });
        }
  
        await cart.save();
      }
  
      res.json({ message: "Added to cart", cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// 🔹 Get user cart
exports.getCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user._id })
        .populate("items.medicine");
  
      if (!cart) return res.json({ items: [] });
  
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// 🔹 Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
      const { medicineId } = req.params;
  
      const cart = await Cart.findOne({ user: req.user._id });
  
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      cart.items = cart.items.filter(
        (item) => item.medicine.toString() !== medicineId
      );
  
      await cart.save();
  
      res.json({ message: "Item removed", cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
      