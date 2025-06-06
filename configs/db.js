const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.dbConnectionUrl);
const dbName = process.env.dbName;

let dbInstance = null;

module.exports = {
    db: async () => {
        if (!dbInstance) {
            await client.connect();
            console.log(`Connected to ${dbName} DB successfully`);
            dbInstance = client.db(dbName);
        }
        return dbInstance;
    }
};
