const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.get('/', [authMiddleware, roleMiddleware], serviceController.getAllServices);
router.get('/:id', [authMiddleware, roleMiddleware], serviceController.getServiceById);
router.post('/', [authMiddleware, roleMiddleware], serviceController.createService);
router.put('/:id', [authMiddleware, roleMiddleware], serviceController.updateService);
router.delete('/:id', [authMiddleware, roleMiddleware], serviceController.deleteService);

module.exports = router;
