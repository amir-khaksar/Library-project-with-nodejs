const http = require('http')
const fs = require("fs")
const url = require("url")
const db = require("./db.json")
 require("dotenv").config()

const bookController = require("./controllers/bookController")
const userController = require("./controllers/userController")
const rentController = require("./controllers/rentController")

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === '/api/users') {
        userController.getAll(req, res);
    } else if (req.method === "GET" && req.url === '/api/books') {
        bookController.getAll(req, res);
    } else if (req.method === "DELETE" && req.url.startsWith('/api/books')) {
        bookController.removeOne(req, res);
    } else if (req.method === "POST" && req.url === "/api/books") {
        bookController.addOne(req, res);
    } else if (req.method === "PUT" && req.url.startsWith("/api/book/back")) {
        bookController.backBook(req, res);
    } else if (req.method === "PUT" && req.url.startsWith("/api/books")) {
        bookController.updateOne(req, res);
    } else if (req.method === "POST" && req.url === "/api/users") {
        userController.register(req, res);
    } else if (req.method === "PUT" && req.url.startsWith("/api/users")) {
        userController.updateCrime(req, res);
    } else if (req.method === "POST" && req.url === "/api/users/login") {
        userController.login(req, res);
    } else if (req.method === "POST" && req.url === "/api/books/rent") {
        rentController.rentBook(req, res);
    }
})

server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})