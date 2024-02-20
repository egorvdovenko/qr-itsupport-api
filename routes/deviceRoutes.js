const express = require('express');
const deviceController = require('../controllers/deviceController');

const router = express.Router();

router.get('/devices', deviceController.getAllDevices);
router.get('/devices/:id', deviceController.getDeviceById);
router.get('/devices/inventory/:inventoryNumber', deviceController.getDeviceByInventoryNumber);
router.post('/devices', deviceController.createDevice);
router.put('/devices/:id', deviceController.updateDevice);
router.delete('/devices/:id', deviceController.deleteDevice);

module.exports = router;