const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');
const Ticket = require('./ticket');
const UserRole = require('../enums/userRole');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isConfirmed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // TODO: to think about type
  role: {
    type: DataTypes.ENUM(Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.USER,
  },
});

User.hasMany(Ticket, { foreignKey: 'userId', as: 'tickets' });
Ticket.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = User;
