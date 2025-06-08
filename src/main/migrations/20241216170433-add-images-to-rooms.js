'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('rooms', 'images', {
      type: Sequelize.JSON, // Usamos JSON para almacenar múltiples imágenes
      allowNull: true, // Permite que las habitaciones no tengan imágenes por defecto
      defaultValue: [], // Inicializa el campo como un array vacío si no se proporciona
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('rooms', 'images');
  },
};
