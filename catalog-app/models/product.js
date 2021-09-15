'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User);
      Product.belongsTo(models.Category, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  };
  Product.init({
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        not: ''
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        not: ''
      }
    },
    price: DataTypes.DECIMAL(6, 2).UNSIGNED,
    viewCount: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: false,
    freezeTableName: true,
    paranoid: true
  });
  return Product;
};