const Device = require('../models/device');

const getAllDevices = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const devices = await Device.findAll({
      limit: parseInt(pageSize),
      offset: parseInt(offset),
    });

    res.json(devices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDeviceById = async (req, res) => {
  const deviceId = parseInt(req.params.id);
  try {
    const device = await Device.findByPk(deviceId);
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createDevice = async (req, res) => {
  const { name } = req.body;
  try {
    const newDevice = await Device.create({ name });
    res.status(201).json(newDevice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateDevice = async (req, res) => {
  const deviceId = parseInt(req.params.id);
  const { name } = req.body;
  try {
    const device = await Device.findByPk(deviceId);
    if (device) {
      device.name = name;
      await device.save();
      res.json(device);
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteDevice = async (req, res) => {
  const deviceId = parseInt(req.params.id);
  try {
    const device = await Device.findByPk(deviceId);
    if (device) {
      await device.destroy();
      res.json({ message: 'Device deleted successfully' });
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
};
