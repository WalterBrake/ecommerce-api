'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShopCarts', {
      shopcartId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: 'no action',
        onUpdate: 'no action',
        references: {
          model: 'Users',
          key: 'userId'
        }
      },
      productId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: 'no action',
        onUpdate: 'no action',
        references: {
          model: 'Products',
          key: 'productId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ShopCarts');
  }
};