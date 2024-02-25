const express = require('express');
const deviceController = require('../controllers/deviceController');

const router = express.Router();

router.get('/', deviceController.getAllDevices);
router.get('/:id', deviceController.getDeviceById);
router.get('/byInventoryNumber/:inventoryNumber', deviceController.getDeviceByInventoryNumber);
router.post('/', deviceController.createDevice);
router.put('/:id', deviceController.updateDevice);
router.delete('/:id', deviceController.deleteDevice);

module.exports = router;