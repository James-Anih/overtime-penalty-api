'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reservations', {
      reservation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      Room_type: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      Customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Hourly_rate: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      Expected_checkin_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      Expected_checkout_time: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('reservations');
  }
};
