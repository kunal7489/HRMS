const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');

// Employee CRUD routes
router.post('/signup', employeeController.signup);
router.get('/list', employeeController.getEmployees);
router.put('/update', employeeController.updateEmployee);
router.get('/getById', employeeController.getEmployeeById);
router.delete('/delete', employeeController.deleteEmployee);
router.delete('/multiDelete', employeeController.multiDeleteEmployees);
router.get('/search', employeeController.searchEmployees);
router.route('/get-dob').get(employeeController.getBirthday)
module.exports = router;
