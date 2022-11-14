/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: '@john_doe',
        password: '$2b$10$CT0b4TfrqSbSNiRnERBkO.16B2ens.bvOwC6nBjtx61ig8A374vGq', // Senha123
        account_id: 1,
      },
      {
        username: '@joao_santos',
        password: '$2b$10$UEDfiVuHkCEnssSL7H7d9eR6UXKs/TSg7tx1aKtHOkk/PUqdn5DEO', // 123Senha
        account_id: 2,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
