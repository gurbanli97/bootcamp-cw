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
      Product.belongsTo(models.User, {
        foreignKey: "created_by",
        onUpdate: "cascade",
        onDelete: "cascade"
      })
      Product.belongsTo(models.Category)
    }
  };
  Product.init({
    productImg: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: DataTypes.DECIMAL(6, 2).UNSIGNED,
    viewCount: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    }
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'Product',
  });
  return Product;
};