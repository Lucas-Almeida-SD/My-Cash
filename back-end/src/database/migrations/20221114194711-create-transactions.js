/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      debitedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'debited_account_id',
        references: {
          model: 'Accounts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      creditedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'credited_account_id',
        references: {
          model: 'Accounts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        field: 'created_at',
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Accounts');
  },
};
