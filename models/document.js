const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  base64String: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

module.exports = Document;
