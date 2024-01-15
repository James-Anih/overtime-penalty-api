'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('reservations', [
      {
        reservation_id: 12000,
        Room_type: 'deluxe',
        Customer_id: 12323,
        Hourly_rate: 230000,
        status: 'paid',
        Expected_checkin_time: '2020-12-12 12:00',
        Expected_checkout_time: '2021-01-01 11:00'
      },
      {
        reservation_id: 12001,
        Room_type: 'regular',
        Customer_id: 12324,
        Hourly_rate: 150000,
        status: 'paid',
        Expected_checkin_time: '2020-12-12 12:00',
        Expected_checkout_time: '2021-01-01 11:00'
      },
      {
        reservation_id: 12002,
        Room_type: 'palatial',
        Customer_id: 12100,
        Hourly_rate: 560000,
        status: 'paid',
        Expected_checkin_time: '2020-12-12 12:00',
        Expected_checkout_time: '2021-01-01 11:00'
      },
      {
        reservation_id: 12003,
        Room_type: 'regular',
        Customer_id: 12323,
        Hourly_rate: 200000,
        status: 'paid',
        Expected_checkin_time: '2020-12-25 12:00',
        Expected_checkout_time: '2021-01-04 11:00'
      }
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('reservations', null, {});
  }
};
