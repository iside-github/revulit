import mongoose from 'mongoose';
require('../models/companies');
require('../models/user');

const connection = {};

async function connect() {
    if (connection.isConnected) {
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log('not disconnected');
        }
    }
}

function convertDocToObj(doc) {
    return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
