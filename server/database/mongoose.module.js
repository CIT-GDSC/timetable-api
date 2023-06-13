const mongoose = require('mongoose');



mongoose.set('strictQuery', true);


const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('MongoDB connected successfully'.cyan.underline.bold);
    } catch (error) {
        console.log('Error connecting to MongoDB'.red.underline.bold);
        console.log(error);
        process.exit(1);
    }
}


module.exports = connectDatabase;
