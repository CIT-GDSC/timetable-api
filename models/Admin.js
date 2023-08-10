const mongoose = require('mongoose');



const adminSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        salt: { type: String, required: true },
        password: { type: String, required: true, select: false },
        sessionToken: { type: String, required: false, select: false },
    }
});


const adminModel = mongoose.model('admin', adminSchema);



const getAdmins = () => adminModel.find({});
const getAdminsById = (id) => adminModel.findById(id);
const createAdmin = (values) => new adminModel(values).save().then((admin) => admin.toObject());
const getAdminBySessionToken = (sessionToken) => adminModel({
    'authentication.sessionToken': sessionToken
});


module.exports = {
    getAdmins,
    getAdminsById,
    createAdmin,
    getAdminBySessionToken,
    adminModel
}
