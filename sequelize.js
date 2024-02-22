const { Sequelize } = require('sequelize');
const config = require('./config/config.json');

const sequelize = new Sequelize(config);

module.exports = { sequelize };