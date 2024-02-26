const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const deviceController = require('../controllers/deviceController');

const router = express.Router();

router.get('/', authMiddleware, deviceController.getAllDevices);
router.get('/:id', authMiddleware, deviceController.getDeviceById);
router.get('/byInventoryNumber/:inventoryNumber', authMiddleware, deviceController.getDeviceByInventoryNumber);
router.post('/', authMiddleware, deviceController.createDevice);
router.put('/:id', authMiddleware, deviceController.updateDevice);
router.delete('/:id', authMiddleware, deviceController.deleteDevice);

module.exports = router;