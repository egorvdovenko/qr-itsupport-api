const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');
const Document = require('./document');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Ticket.hasMany(Document, { foreignKey: "ticketId", as: "documents" });
Document.belongsTo(Ticket, { foreignKey: "ticketId", as: "ticket" });

module.exports = Ticket;
