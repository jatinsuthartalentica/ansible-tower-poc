const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/add-user', userController.addUser);
router.get('/get-all-users', userController.getAllUsers);
router.get('/get-user/:id', userController.getUser);

module.exports = router;
