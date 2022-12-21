const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');
const ROLES_LIST = require('../../config/rolesList');
const verifyROLES = require('../../middleware/verifyROLES');

router
    .route('/')
    .get(employeeController.getAllEmployees)
    .delete(verifyROLES(ROLES_LIST.Admin), employeeController.deleteEmployee)
    .post(verifyROLES(ROLES_LIST.Admin), employeeController.createEmployee);

module.exports = router;
