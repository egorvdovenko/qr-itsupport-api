'use strict';

const bcrypt = require('bcrypt');
const { sequelize } = require('../sequelize');

const User = require('../models/user');
const Ticket = require('../models/ticket');
const Device = require('../models/device');
const Service = require('../models/service');

const UserRole = require('../enums/userRole');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed users into the database
    const users = await User.bulkCreate([
      {
        email: 'admin@example.com',
        password: await bcrypt.hash('admin', 10),
        phoneNumber: '9182736450',
        isConfirmed: true,
        role: UserRole.ADMIN
      },
      {
        email: 'user1@example.com',
        password: await bcrypt.hash('password1', 10),
        phoneNumber: '1234567890',
        isConfirmed: false,
        role: UserRole.USER
      },
      {
        email: 'user2@example.com',
        password: await bcrypt.hash('password2', 10),
        phoneNumber: '9876543210',
        isConfirmed: false,
        role: UserRole.USER
      },
    ]);

    // Seed services into the database
    const services = await Service.bulkCreate([
      {
        city: 'City1',
        phoneNumber: '1234567890',
      },
      {
        city: 'City2',
        phoneNumber: '9876543210',
      },
    ]);

    // Link users with services
    await User.update({ serviceId: services[0].id }, { where: { id: users[0].id } });
    await User.update({ serviceId: services[1].id }, { where: { id: users[1].id } });

    // Seed devices into the database
    const devices = await Device.bulkCreate([
      {
        title: 'Device 1',
        inventoryNumber: 'INV001',
        location: 'Location 1',
      },
      {
        title: 'Device 2',
        inventoryNumber: 'INV002',
        location: 'Location 2',
      },
    ]);

    // Seed tickets into the database with associations to users and devices
    await Ticket.bulkCreate([
      {
        title: 'Ticket 1',
        description: 'Description 1',
        isDone: false,
        userId: users[0].id,
        deviceId: devices[0].id,
      },
      {
        title: 'Ticket 2',
        description: 'Description 2',
        isDone: true,
        userId: users[1].id,
        deviceId: devices[1].id,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Ticket.destroy({ where: {} });
    await User.destroy({ where: {} });
    await Service.destroy({ where: {} });
    await Device.destroy({ where: {} });
  },
};
