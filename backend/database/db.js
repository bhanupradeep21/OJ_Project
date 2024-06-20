const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbconnection = async () => {
    const mongo_uri = process.env.MONGO_URI;
    try {
        const conn = await mongoose.connect(mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: { w: 'majority' } 
        });
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Error in database connection', err);
    }
}

module.exports = { dbconnection };
