const mongoose = require('mongoose');
const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) res.status(204).json('no employee found');
    res.json(employees);
};

const createEmployee = async (req, res) => {
    const { id, firstname, lastname, employeeID } = req.body;
    if (!id || !employeeID)
        return res.status(204).json({ message: 'id fields are required' });

    const result = await Employee.create({
        id: id,
        firstname: firstname,
        lastname: lastname,
        employeeID: employeeID,
    });
    res.json(result);
};

const deleteEmployee = async (req, res) => {
    console.log('employee deleted');
};

module.exports = { getAllEmployees, createEmployee, deleteEmployee };
