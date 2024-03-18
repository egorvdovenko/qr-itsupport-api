const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const deviceController = require('../controllers/deviceController');

const router = express.Router();

router.get('/', [authMiddleware, roleMiddleware], deviceController.getAllDevices);
router.get('/:id', [authMiddleware], deviceController.getDeviceById);
router.get('/byInventoryNumber/:inventoryNumber', [authMiddleware], deviceController.getDeviceByInventoryNumber);
router.post('/', [authMiddleware, roleMiddleware], deviceController.createDevice);
router.put('/:id', [authMiddleware, roleMiddleware], deviceController.updateDevice);
router.delete('/:id', [authMiddleware, roleMiddleware], deviceController.deleteDevice);

module.exports = router;