/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Transactions', [
      {
        debited_account_id: 1,
        credited_account_id: 2,
        value: 20,
        created_at: new Date('2022-10-10'),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};
