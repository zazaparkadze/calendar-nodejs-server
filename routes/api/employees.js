const express = require('express');
const router = express.Router();
const employeeConrotler = require('../../controllers/employeeController');

router
    .route('/')
    .get(employeeConrotler.getAllEmployees)
    .post(employeeConrotler.createEmployee);

module.exports = router;
