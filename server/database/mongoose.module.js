
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);


const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = { connectDatabase }
