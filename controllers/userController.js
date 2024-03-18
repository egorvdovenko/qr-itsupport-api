const User = require('../models/user');
const Service = require('../models/service');

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const { count, rows: users } = await User.findAndCountAll({
      attributes: { exclude: ['password'] },
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
      attributes: { exclude: ['password'] },
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
  const { email, phoneNumber, isConfirmed, serviceId, role } = req.body;
  try {
    const newUser = await User.create({
      email,
      phoneNumber,
      isConfirmed,
      role,
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
  const { email, phoneNumber, isConfirmed, serviceId, role } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.isConfirmed = isConfirmed;
      user.role = role;
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
