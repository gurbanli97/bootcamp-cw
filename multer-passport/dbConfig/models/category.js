"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product);
      Category.belongsTo(models.User);
    }
  }
  Category.init(
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          is: /^.+$/i
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: false,
      modelName: "Category",
    }
  );
  return Category;
};
