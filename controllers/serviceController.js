const Service = require('../models/service');

const getAllServices = async (req, res) => {
  try {
    const { page, pageSize } = req.query;

    let options = {};
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      options.limit = parseInt(pageSize);
      options.offset = parseInt(offset);
    }

    const { count, rows: services } = await Service.findAndCountAll(options);

    res.json({
      totalItems: count,
      items: services,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getServiceById = async (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createService = async (req, res) => {
  try {
    const { city, phoneNumber } = req.body;
    const newService = await Service.create({
      city,
      phoneNumber,
    });

    res.status(201).json(newService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateService = async (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const { city, phoneNumber } = req.body;
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    service.city = city;
    service.phoneNumber = phoneNumber;
    await service.save();

    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteService = async (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await service.destroy();

    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
