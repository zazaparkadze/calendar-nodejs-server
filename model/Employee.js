const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

const employeeSchema = new Schema({
    id: { type: Number, requied: true },
    firstname: {
        type: String,
        requied: true,
    },
    lastname: {
        type: String,
        requied: true,
    },
    employeeID: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);
