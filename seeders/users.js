'use strict';

const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.bulkCreate([
      {
        email: 'user1@example.com',
        password: await bcrypt.hash('password1', 10),
      },
      {
        email: 'user2@example.com',
        password: await bcrypt.hash('password2', 10),
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
