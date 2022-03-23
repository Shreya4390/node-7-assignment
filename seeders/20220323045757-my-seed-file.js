'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'Shubham Singh',
      email: 'shubham@test.com',
      phone: "9091098419",
      gender: 'male',
      age: 23,
      occupation: "job",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Janhvi Singh',
      email: 'janhvi@test.com',
      phone: "90910984000",
      gender: 'female',
      age: 22,
      occupation: "job",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', [{
      email: 'shubham@test.com',
    }, {
      email: 'janhvi@test.com',
    }])
  }
};