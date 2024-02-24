'use strict';

const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.bulkCreate([
      {
        email: 'user1@example.com',
        password: await bcrypt.hash('password1', 10),
        phoneNumber: '1234567890', // Add the phoneNumber
        city: 'City1', // Add the city
        isConfirmed: true, // Add the isConfirmed
      },
      {
        email: 'user2@example.com',
        password: await bcrypt.hash('password2', 10),
        phoneNumber: '9876543210', // Add the phoneNumber
        city: 'City2', // Add the city
        isConfirmed: false, // Add the isConfirmed
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await User.destroy({
      where: {
        email: ['user1@example.com', 'user2@example.com'],
      },
    });
  },
};
