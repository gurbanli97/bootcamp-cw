'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.hasMany(models.Post);
    }
  };
  Author.init({
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false,
    validate: {

    }
  }
}, {
    sequelize,
    modelName: 'Author',
    freezeTableName: true,
    tableName: 'Author',
    timestamps: false
  });
  return Author;
};