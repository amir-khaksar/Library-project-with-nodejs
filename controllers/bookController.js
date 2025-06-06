const url = require("url")
const fs = require("fs")

const bookModel = require("../models/book");
const userModel = require("../models/User");

const getAll = async (req, res) => {

    const books = await bookModel.find()

    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(books));
    res.end();
}

const removeOne = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const bookID = parsedUrl.query.id;

    const removedBook = await bookModel.remove(bookID);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(removedBook));
    res.end();
}

const addOne = async (req, res) => {
    let reqBody = ""

    req.on("data", (data) => {
        reqBody += data.toString();
    })

    req.on("end", async () => {
        const parsedBook = JSON.parse(reqBody);
        const addBook = await bookModel.add(parsedBook);

        res.writeHead(201, {"Content-Type": "application/json"});
        res.write(JSON.stringify(addBook));
        res.end();
    })
}

const updateOne = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const bookID = parsedUrl.query.id;

    let bookNewInfos = ""

    req.on("data", (data) => {
        bookNewInfos = bookNewInfos + data.toString();
    })

    req.on("end", async () => {
        const reqBody = JSON.parse(bookNewInfos);
        const updatedBook = await bookModel.update(bookID, reqBody);

        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(updatedBook));
        res.end();
    })
}

const backBook = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const bookId = parsedUrl.query.id;
    const result = await bookModel.back(bookId);

    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(result));
    res.end();
}

module.exports = {
    getAll,
    removeOne,
    addOne,
    updateOne,
    backBook,
}