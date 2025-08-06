<div align="center">
  <img src="https://raw.githubusercontent.com/user-attachments/assets/6eb1b250-7d72-46cc-94a4-de5259c79e60" alt="Tomato Logo" width="150"/>
  <h1>Tomato - Food Delivery App</h1>
  <p><b>A full-stack food ordering platform featuring a customer-facing frontend, a powerful backend API, and a dedicated admin panel.</b></p>
  <p>Built with the MERN stack (MongoDB, Express, React, Node.js) and integrated with Stripe for secure payments.</p>

  <p>
    <img src="https://img.shields.io/badge/license-ISC-green.svg" alt="License Badge">
    <img src="https://img.shields.io/github/stars/yourusername/tomato?style=social" alt="GitHub Stars">
    <img src="https://img.shields.io/github/forks/yourusername/tomato?style=social" alt="GitHub Forks">
    <br />
    <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB">
    <img src="https://img.shields.io/badge/Stripe-626CD9?logo=stripe&logoColor=white" alt="Stripe">
  </p>
</div>

## 🚀 Live Demo

[Check out the live application!](https://your-live-demo-link.com) &nbsp;&nbsp;*(<- Add your deployment link here)*

## ✨ Core Features

This application provides a complete ecosystem for a food delivery business.

| Category | Feature | Description |
| :--- | :--- | :--- |
| 👤 **User** | **Authentication** | Secure user registration and login using JWT. |
| | **Food Browse** | View a list of available food items with details, prices, and images. |
| | **Shopping Cart** | Add, remove, and view items in a persistent shopping cart. |
| | **Order Placement** | Seamlessly place orders and proceed to payment. |
| | **Payment Processing** | Securely pay for orders using the Stripe integration. |
| | **Order History** | View a personal history of all past orders and their status. |
| 👨‍💼 **Admin** | **Food Management** | A dedicated panel to add, view, and remove food items from the menu. |
| | **Order Dashboard** | A centralized view of all customer orders. |
| | **Status Updates** | Update the status of orders (e.g., "Processing", "Out for delivery"). |
| | **User Monitoring** | Track orders and manage the platform's inventory. |

## 🛠️ Technology Stack

The project is a monorepo composed of three distinct parts: a React frontend for users, a Node.js backend API, and a React admin panel.

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend (User)** | **React 18** & **Vite** | For a fast, modern single-page application. |
| | **React Router DOM** | For client-side routing between pages. |
| | **React Context API** | For managing global state like cart items and user auth. |
| | **Axios** | For making HTTP requests to the backend API. |
| **Backend (API)** | **Node.js** & **Express.js** | To build the robust and scalable RESTful API. |
| | **MongoDB** & **Mongoose** | As the database and ODM for data modeling and storage. |
| | **JSON Web Tokens (JWT)** | For securing API endpoints and managing user sessions. |
| | **Bcrypt** | For hashing user passwords securely. |
| | **Multer** | Middleware for handling image file uploads. |
| | **Stripe** | For handling all payment-related processing. |
| | **CORS** | To enable cross-origin requests from the frontend and admin panels. |
| **Admin Panel** | **React 18** & **Vite** | A separate, dedicated interface for platform management. |
| | **Axios & React Toastify** | For API communication and providing feedback on admin actions. |

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [MongoDB](https://www.mongodb.com/try/download/community) (local instance or a cloud-based Atlas cluster)
-   A [Stripe](https://stripe.com/) account for payment processing.

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/yourusername/tomato.git](https://github.com/yourusername/tomato.git)
    cd tomato
    ```

2.  **Install Dependencies for all parts**
    ```bash
    # For the backend
    cd backend && npm install

    # For the frontend
    cd ../frontend && npm install

    # For the admin panel
    cd ../admin && npm install

    # Return to the root directory
    cd ..
    ```

3.  **Configure Environment Variables**

    -   In the `/backend` directory, create a `.env` file:
        ```env
        # Server Port
        PORT=4000

        # MongoDB Connection String
        MONGODB_URI=your_mongodb_connection_string

        # JWT Secret for creating tokens
        JWT_SECRET=your_super_secret_jwt_key

        # Stripe Secret Key (from your Stripe Dashboard)
        STRIPE_SECRET_KEY=sk_test_yourstripesecretkey
        ```

    -   In the `/frontend` directory, create a `.env` file:
        ```env
        # URL of the backend API
        VITE_BACKEND_URL=http://localhost:4000
        ```

4.  **Run the Application**

    You will need to open three separate terminal windows to run all services concurrently.

    -   **Terminal 1: Start the Backend Server** (from the `/backend` directory):
        ```bash
        npm run server
        ```
        *Backend will be running on `http://localhost:4000`*

    -   **Terminal 2: Start the Frontend Application** (from the `/frontend` directory):
        ```bash
        npm run dev
        ```
        *Frontend will be running on `http://localhost:5173`*

    -   **Terminal 3: Start the Admin Panel** (from the `/admin` directory):
        ```bash
        npm run dev
        ```
        *Admin panel will be running on `http://localhost:5174`*

## 🔐 API Endpoints & Access Control

| HTTP Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/register` | Register a new user. | Public |
| `POST` | `/api/user/login` | Log in an existing user. | Public |
| `POST` | `/api/food/add` | Add a new food item to the menu. | Admin |
| `GET` | `/api/food/list` | Get a list of all food items. | Public |
| `POST` | `/api/food/remove` | Remove a food item. | Admin |
| `POST` | `/api/cart/add` | Add an item to the user's cart. | User |
| `POST` | `/api/cart/remove` | Remove an item from the user's cart. | User |
| `POST` | `/api/cart/get` | Retrieve the user's current cart. | User |
| `POST` | `/api/order/place` | Place a new order (creates Stripe session). | User |
| `POST` | `/api/order/verify` | Verify a successful payment. | User |
| `POST` | `/api/order/userorders` | Get the order history for the logged-in user. | User |
| `GET` | `/api/order/list` | Get a list of all orders from all users. | Admin |
| `POST` | `/api/order/status` | Update the status of an order. | Admin |

## 📸 Screenshots

*A picture is worth a thousand words. Add screenshots or a GIF of your application in action here to showcase its features and UI.*

| Home Page | Admin Dashboard |
| :---: | :---: |
| ** | ** |

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. Please read our `CONTRIBUTING.md` for details on our code of conduct.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📝 License

This project is licensed under the ISC License. See the `LICENSE` file for more details.

## 👨‍💻 Author

**Vinayak Bhovi**

-   GitHub: [@yourusername](https://github.com/yourusername)
-   LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/yourprofile/)

---

<div align="center">
  <p>⭐ Star this repository if you find it helpful! ⭐</p>
</div>
