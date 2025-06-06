const fs = require("fs")
const {db} = require("../configs/db")
const {ObjectId} = require("mongodb");

const rent = async ({userID, bookID}) => {
    try {
        const database = await db();
        const booksCollection = database.collection("books");
        const rentsCollection = database.collection("rents");

        const objectUserID = new ObjectId(userID);
        const objectBookID = new ObjectId(bookID);

        const isFreeBook = await booksCollection.findOne({
            _id: new ObjectId(userID),
            free: 1,
        })

        if (isFreeBook) {
            throw {message: "Book is not available for rent."};
        }

        const alreadyRented = await rentsCollection.findOne({objectUserID, objectBookID});

        if (alreadyRented) {
            throw {message: "You have already rented this book."};
        }

        const newRent = {
            userID: objectUserID,
            bookID: objectBookID,
            rentedAt: new Date(),
        }

        await rentsCollection.insertOne(newRent);

        return {message: "Book rented successfully."};
    } catch (error) {
        console.error(error);
        throw error;
    }

};

module.exports = {
    rent,
};