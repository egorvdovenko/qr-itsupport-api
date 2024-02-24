'use strict';

const Service = require('../models/service');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await Service.bulkCreate([
    //   {
    //     city: 'City 1',
    //     phoneNumber: '123-456-7890',
    //   },
    //   {
    //     city: 'City 2',
    //     phoneNumber: '987-654-3210',
    //   },
    // ]);
  },

  down: async (queryInterface, Sequelize) => {
    // await Service.destroy({
    //   where: {
    //     city: ['City 1', 'City 2'],
    //     phoneNumber: ['123-456-7890', '987-654-3210'],
    //   },
    // });
  },
};
