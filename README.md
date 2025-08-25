# 💊 PillPal - Community Medicine Sharing Platform

PillPal is a **MERN stack web application** designed as a **community-driven medicine sharing platform** with an incentivized payment system.  
It enables individuals to **share, request, and verify medicines** within their community, while pharmacies ensure quality and safety.  

---

## ✨ Key Features

- 👥 **Role-Based Dashboards**
  - **Buyer Dashboard**: Search, filter, and request verified medicines, manage cart, checkout flow  
  - **Seller Dashboard**: Add medicines (with expiry date, price, quantity) and manage listings  
  - **Pharmacy Dashboard**: Verify medicines and ensure authenticity before making them available  
  - *(Optional)* **Admin Panel** for overseeing users and platform activity  

- 🔐 **Authentication & Security**
  - JWT-based authentication with protected routes  
  - Role-based access control  
  - Secure storage of user and medicine data  

- 🛒 **E-Commerce Flow**
  - Cart functionality with quantity management, item removal, and checkout  
  - Payment handling (success/failure status)  

- 📦 **Medicine Management**
  - Add, update, and manage medicines with full details  
  - Buyer sees only verified & available medicines  

- ⚡ **AI-Powered Insights (Planned)**
  - Suggest trending products  
  - Predict stock levels  
  - Identify community demand patterns  

---

## 🛠 Tech Stack

- **Frontend:** React.js, Context API, React Router  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT (JSON Web Tokens)  
- **Styling:** Plain CSS  
- **Other Tools:** Multer (for uploads), dotenv, bcrypt  

---

## 📂 Project Structure

PillPal/
├── backend/
│ ├── models/ # Mongoose models (User, Medicine, etc.)
│ ├── routes/ # API routes (auth, medicine, cart)
│ ├── middleware/ # JWT protect middleware
│ ├── server.js # Entry point
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/ # Buyer, Seller, Pharmacy Dashboards
│ │ ├── context/ # AuthContext for JWT handling
│ │ ├── components/ # UI components
│ │ └── App.js # Routing setup
│ └── package.json
│
└── README.md

yaml
Copy
Edit

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/PillPal.git
cd PillPal
2️⃣ Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file inside backend/ with:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Run backend server:

bash
Copy
Edit
npm start
3️⃣ Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
Frontend runs at http://localhost:3000 and backend at http://localhost:5000.

📌 API Endpoints (Backend)
🔑 Auth Routes
POST /api/auth/register → Register new user

POST /api/auth/login → Login and get JWT token

💊 Medicine Routes
POST /api/medicines/add → Add a new medicine (Seller only, Protected)

GET /api/medicines → Get all verified & available medicines (Buyer)

PUT /api/medicines/verify/:id → Verify medicine (Pharmacy)

DELETE /api/medicines/:id → Delete a medicine

🛒 Cart Routes
POST /api/cart/add → Add item to cart (Buyer)

GET /api/cart → View cart items

DELETE /api/cart/:id → Remove item from cart

🎯 Future Roadmap
💳 Payment gateway integration (Stripe/PayPal)

📱 Mobile-friendly UI with responsive design

🔍 Advanced search & filtering with AI suggestions

☁️ Cloud storage for prescription/medicine images

📊 Analytics for sellers and pharmacies

🤝 Contributing
Contributions are welcome! Fork the repo, create a branch, and submit a pull request.

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Akash Garg
