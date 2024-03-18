const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', [authMiddleware, roleMiddleware], userController.getAllUsers);
router.get('/:id', [authMiddleware, roleMiddleware], userController.getUserById);
router.post('/', [authMiddleware, roleMiddleware], userController.createUser);
router.put('/:id', [authMiddleware, roleMiddleware], userController.updateUser);
router.delete('/:id', [authMiddleware, roleMiddleware], userController.deleteUser);

module.exports = router;