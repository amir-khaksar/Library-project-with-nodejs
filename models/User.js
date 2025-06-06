const fs = require("fs")
const {db} = require("../configs/db")
const {ObjectId} = require("mongodb");

const find = async () => {
    try {
        const database = await db();
        const usersCollection = await database.collection("users");
        const users = await usersCollection.find({}).toArray();
        return users;
    } catch (err) {
        console.error(err)
        throw err;
    }
}

const add = async ({name, username, email}) => {
    if (!name || !username || !email) {
        throw {message: "User data are not valid."};
    }

    try {
        const database = await db();
        const userCollection = database.collection('users');

        const isExist = await userCollection.findOne({
            $or: [{username}, {email}],
        });

        if (isExist) {
            throw {message: "email or username already exists"};
        }

        const newUser = {
            name,
            username,
            email,
            crime: 0,
            role: "USER",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await userCollection.insertOne(newUser);
        return {message: "User Registered successfully."};
    } catch (err) {
        throw err;
    }
};


const updateCrime = async (crime, userId) => {
    try {
        const database = await db();
        const userCollection = database.collection('users');

        const result = userCollection.updateOne({_id: new ObjectId(userId)}, {
            $set: {
                crime: crime
            }
        })

        if (result.matchedCount === 0) {
            throw {message: "User not found."};
        }

        return {message: "User crime updated successfully."};
    } catch (err) {
        throw err;
    }
};

const login = async ({username, email}) => {
    try {
        const database = await db();
        const userCollection = database.collection('users');

        const user = await userCollection.findOne({username, email});

        if (!user) {
            throw {message: "User login failed"};
        }

        return {username: user.username, email: user.email};
    } catch (err) {
        throw err;
    }
};

module.exports = {
    find,
    add,
    updateCrime,
    login,
}