🩺 PillPal — Community Medicine Sharing Platform

PillPal is a secure MERN-stack platform designed to enable community-driven medicine sharing.
It connects Buyers, Sellers, and Pharmacies through a trust-based ecosystem with:

✅ Medicine uploads & verification
✅ Cart & medicine request workflow
✅ Order lifecycle management
✅ Incentive rewards system
✅ Role-based dashboards
✅ JWT authentication & authorization

🚀 Tech Stack

Frontend

React.js

HTML, CSS, JavaScript

Axios (API calls)

React Router DOM

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

BCrypt Password Hashing

👥 User Roles & Capabilities
🛍 Buyer

✔ Browse verified medicines
✔ Add medicine to cart
✔ Request medicine from seller
✔ Track order status
✔ Earn reward points
✔ View incentive wallet

🏬 Seller

✔ Upload medicines
✔ Track verification status
✔ View buyer requests
✔ Accept / Reject medicine orders
✔ Mark orders as completed
✔ Stock auto-updates on completion

🧑‍⚕ Pharmacy (Verifier)

✔ Review pending medicines
✔ Approve / Reject uploads
✔ Add verification remarks
✔ Ensures safety & trust

🎯 Core Features
🔐 Secure Authentication

✔ JWT based login & role-access
✔ Protected routes
✔ Persistent login via LocalStorage

💊 Medicine Upload & Verification Workflow

1️⃣ Seller uploads medicine
2️⃣ Medicine goes to pending_verification
3️⃣ Pharmacy reviews
4️⃣ Approve / Reject
5️⃣ Approved medicines become available to buyers

Ensures quality, legality & trust

🛒 Cart & Medicine Request Flow

Buyer adds to cart → Converts to order request →
Seller accepts / rejects → If completed:

✔ Stock auto-reduces
✔ Incentive points credited to buyer

🏆 Incentive & Rewards System

Earn reward points when:

✔ Orders completed
✔ Medicines successfully exchanged

Points stored in:

👉 Incentive Wallet

Includes:

Reward history log

Order-based reward mapping

📦 Order Lifecycle

Requested

Accepted

Rejected

Completed (Triggers rewards)
