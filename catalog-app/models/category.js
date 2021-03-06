'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.User);
      Category.hasMany(models.Product);
    }
  };
  Category.init({
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        is: /^.+$/i
      }
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Category',
    freezeTableName: true,
    timestamps: false,
    paranoid: true
  });
  return Category;
};