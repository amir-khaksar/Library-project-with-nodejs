const fs = require("fs")
const {db} = require('../configs/db');
const {ObjectId} = require("mongodb");

const find = async () => {
    try {
        const database = await db();
        const booksCollection = database.collection("books");
        const books = await booksCollection.find({}).toArray();
        return books;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

module.exports = {find};


const remove = async (bookID) => {
    try {
        const database = await db();
        const booksCollection = await database.collection("books");

        const result = booksCollection.deleteOne({_id: new ObjectId(bookID)});
        if (result.deletedCount === 0) {
            throw {message: "Book does not exist"};
        }

        return {message: "Book deleted successfully."};
    } catch (err) {
        console.error(err)
        throw err;
    }
}

const add = async (book) => {
    try {
        const database = await db();
        const booksCollection = database.collection("books");

        const newBook = {
            ...book,
            free: 1,
        };

        const result = await booksCollection.insertOne(newBook);
        return {message: "Book saved successfully.", id: result.insertedId};
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
};

const update = async (bookID, updatedInfo) => {
    try {
        const database = await db();
        const booksCollection = database.collection("books");

        const result = booksCollection.updateOne({_id: new ObjectId(bookID)}, {$set: updatedInfo});
        if (result.matchedCount === 0) {
            return {message: "Book not found."};
        }

        return {message: "Book updated successfully."};
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const back = async (bookID) => {
    try {
        const database = await db();
        const bookCollection = database.collection("books");

        const result = await bookCollection.updateOne(
            { _id: new ObjectId(bookID) },
            { $set: { free: 1 } }
        );

        if (result.matchedCount === 0) {
            throw { message: "Book not found" };
        }

        return { message: "Book returned successfully." };
    } catch (error) {
        console.error("Error returning book:", error);
        throw error;
    }
};

module.exports = {
    find,
    remove,
    add,
    update,
    back,
}