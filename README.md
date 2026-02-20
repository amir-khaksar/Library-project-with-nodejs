# 📚 Library Management System API  
### Backend REST API built with Native Node.js & MongoDB

A production-structured RESTful API for managing a library system, built entirely with **pure Node.js (no Express)** and the MongoDB native driver.

This project focuses on understanding how backend systems work under the hood by manually implementing:

- HTTP server handling  
- Routing logic  
- Request parsing  
- Layered architecture  
- Database operations  

---

## 🚀 Core Features

### 📖 Book Management
- Retrieve all books
- Add new book
- Update book details
- Delete book
- Rent a book
- Return a book
- Track availability (`free` status)

### 👤 User Management
- Register user
- Login user
- Retrieve all users
- Update user penalty / crime status

---

## 🏗 Architecture Overview

This project follows a clean layered structure:

```
Client → Controller → Model → Database
```

### Architectural Principles

- No frameworks (no Express)
- Manual routing via conditional request handling
- Native HTTP module usage
- MongoDB Native Driver
- Separation of concerns (Controller / Model)
- Async/Await database operations
- Environment-based configuration via dotenv

---

## 🛠 Tech Stack

- **Node.js** (Native `http` module)
- **MongoDB** (Native Driver)
- **dotenv**
- JavaScript (ES6+)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create Environment File

Create a `.env` file in root directory:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Run Server

```bash
npm start
```

Server will start at:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### 📖 Books

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | `/api/books` | Get all books |
| POST | `/api/books` | Add new book |
| PUT | `/api/books?id=BOOK_ID` | Update book |
| DELETE | `/api/books?id=BOOK_ID` | Delete book |
| PUT | `/api/book/back?id=BOOK_ID` | Return book |
| POST | `/api/books/rent` | Rent book |

---

### 👤 Users

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Register |
| POST | `/api/users/login` | Login |
| PUT | `/api/users?id=USER_ID` | Update penalty |

---

## 📦 Sample Book Document

```json
{
  "_id": "ObjectId",
  "title": "Atomic Habits",
  "author": "James Clear",
  "year": 2018,
  "free": 1
}
```

---

## 🧠 Technical Highlights

- Manual HTTP request body parsing using `req.on("data")`
- Query parsing via `url.parse`
- MongoDB ObjectId usage for document targeting
- RESTful route handling without third-party routing libraries
- Asynchronous database layer abstraction
- Environment variable security practices

---

## 🔐 Security & Improvements (Next Steps)

- Centralized error handler
- JWT authentication
- Role-based access control
- Request validation layer
- Proper routing abstraction
- Logging middleware
- Rate limiting
- Swagger/OpenAPI documentation
- Unit & Integration testing

---

## 🎯 Learning Outcomes

This project demonstrates strong backend fundamentals:

- Deep understanding of Node.js HTTP lifecycle
- Ability to build APIs without frameworks
- Clean separation between business logic and data layer
- Practical MongoDB usage
- Async programming patterns

---

## 📄 License

MIT License  
Open for learning and improvement.