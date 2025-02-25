# Microservices-Based Uber Clone Backend

## 📌 Project Overview
This project is a **scalable backend system** designed for a real-world **Uber Clone** application. It follows **Microservices Architecture** and includes:

- **User Service**: Manages user authentication and profiles.
- **Captain Service**: Handles captain (driver) management.
- **Ride Service**: Manages ride requests, tracking, and history.
- **API Gateway**: A single entry point for clients to communicate with all services.

The system supports **service-to-service communication**, **API Gateway**, **load balancing**, **long polling**, and **database management** to ensure high scalability and reliability.

---

## 🏗️ Project Architecture & Folder Structure
```
Microservice-uber-user-captain-ride/
│── gateway/                # API Gateway for routing
│   ├── app.js              # Express setup for API Gateway
│   ├── package.json        # Dependencies
│
│── user/                   # User service
│   ├── controllers/        # Business logic
│   ├── db/                 # Database connection
│   ├── middleware/         # Authentication middleware
│   ├── models/             # User schema (MongoDB)
│   ├── routes/             # API endpoints
│   ├── service/            # RabbitMQ messaging
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│
│── captain/                # Captain service (similar structure to user)
│
│── ride/                   # Ride service
│   ├── controller/         # Handles ride requests
│   ├── db/                 # MongoDB connection
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Ride schema
│   ├── routes/             # API routes
│   ├── service/            # RabbitMQ messaging
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│
│── .gitignore              # Ignore node_modules, .env
│── Microservice-uber.postman_collection.json  # API documentation
```

---

## 🛠️ Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **Messaging**: RabbitMQ (amqplib)
- **Environment Management**: dotenv
- **HTTP Requests**: Axios
- **API Gateway**: Express Gateway


---

## 🔄 Microservices Communication & API Gateway
The system follows **Microservices Architecture**, meaning each service operates independently.

✅ **Service Communication:** Uses **RabbitMQ** for event-driven messaging. Example:
- User books a ride → A message is sent to the **Ride Service**.
- Ride is assigned → A message is sent to the **Captain Service**.
- Captain accepts → A message updates the **User Service**.

✅ **API Gateway:** All requests go through the **Gateway (gateway/app.js)**, which routes them to appropriate microservices.

---

## 🔐 Authentication & Security
- **JWT** is used for authentication.
- **bcrypt** is used for password hashing.
- **Middleware** ensures only authorized users access endpoints.

## ⚖️ Load Balancing & Scalability
- **RabbitMQ** allows asynchronous task handling, reducing service overload.
- **Load balancer** can distribute incoming requests across multiple instances.
- **Database Replication** can improve query performance and reliability.

---
## 🛢️ Database Management (MongoDB)
Each service has its **own database**, preventing direct coupling between services.

- **User Service** → Users & Authentication
- **Captain Service** → Captains & Availability
- **Ride Service** → Rides & Status Updates

Example MongoDB Schema (`ride.model.js`):
```js
const mongoose = require('mongoose');
const rideSchema = new mongoose.Schema({
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    captainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Captain' }
});
module.exports = mongoose.model('Ride', rideSchema);
```

---

## 📨 Event-Driven Communication with RabbitMQ
- **amqplib** is used for RabbitMQ integration.
- Services publish events and listen for relevant messages.

## 📖 Postman Documentation
- API collection is included (`Microservice-uber.postman_collection.json`).
  

