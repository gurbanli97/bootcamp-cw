'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addColumn('Users','username',Sequelize.STRING(120),{
     allowNull: false
   });
   await queryInterface.addColumn('Users','lastName',Sequelize.STRING(120),{
    allowNull: false
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users','username')
    await queryInterface.removeColumn('Users','lastName')
  }
};
