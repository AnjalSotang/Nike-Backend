'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'otp', {
      type: Sequelize.STRING,
      allowNull: true,  // Adjust as needed
    });
    await queryInterface.addColumn('users', 'otpExpire', {
      type: Sequelize.DATE,
      allowNull: true,  // Adjust as needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'otp');
    await queryInterface.removeColumn('users', 'otpExpire');
  }
};
