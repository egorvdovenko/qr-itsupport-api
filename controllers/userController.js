const User = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await User.findByPk(userId);
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
  const { name, email } = req.body;
  try {
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.name = name;
      user.email = email
      await user.save();
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
