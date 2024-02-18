const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Имя файла SQLite базы данных
});

module.exports = { sequelize };