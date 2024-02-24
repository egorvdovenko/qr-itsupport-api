const User = require('../models/user');
const Ticket = require('../models/ticket');
const Service = require('../models/service'); // Replace with the correct path for Service model

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const { count, rows: users } = await User.findAndCountAll({
      include: [
        { model: Ticket, as: 'tickets' },
        { model: Service, as: 'service' },
      ],
      limit: parseInt(pageSize),
      offset: parseInt(offset),
    });

    res.json({
      totalItems: count,
      items: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await User.findByPk(userId, {
      include: [
        { model: Ticket, as: 'tickets' },
        { model: Service, as: 'service' },
      ],
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  const { email, phoneNumber, isConfirmed, serviceId } = req.body;
  try {
    const newUser = await User.create({
      email,
      phoneNumber,
      isConfirmed,
    });

    if (serviceId) {
      const service = await Service.findByPk(serviceId);
      if (service) {
        await newUser.setService(service);
      }
    }

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { email, phoneNumber, isConfirmed, serviceId } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.isConfirmed = isConfirmed;
      await user.save();

      if (serviceId) {
        const service = await Service.findByPk(serviceId);
        if (service) {
          await user.setService(service);
        }
      }

      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
