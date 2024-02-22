'use strict';

const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed users into the database
    await User.bulkCreate([
      {
        email: 'user1@example.com',
        password: await bcrypt.hash('password1', 10),
      },
      {
        email: 'user2@example.com',
        password: await bcrypt.hash('password2', 10),
      },
      // Add more users as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove seeded users from the database
    await User.destroy({
      where: {
        email: ['user1@example.com', 'user2@example.com'],
        // Include more emails as needed
      },
    });
  },
};
