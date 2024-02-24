'use strict';

const Device = require('../models/device');
const Ticket = require('../models/ticket');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const devices = await Device.bulkCreate([
      {
        title: 'Device 1',
        inventoryNumber: 'INV001',
        location: 'Location A',
      },
      {
        title: 'Device 2',
        inventoryNumber: 'INV002',
        location: 'Location B',
      },
    ]);

    for (const device of devices) {
      await Ticket.create({
        title: `Ticket for ${device.title}`,
        description: 'Ticket description',
        deviceId: device.id,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await Device.destroy({ where: {} });
    await Ticket.destroy({ where: {} });
  },
};
