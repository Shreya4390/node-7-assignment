'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Address',
  });

  Address.associate = models => {
    Address.belongsTo(models.User, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    })
  };

  return Address;
};