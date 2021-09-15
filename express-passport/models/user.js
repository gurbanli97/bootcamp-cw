'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstname:{
      type:  DataTypes.STRING(120),
      allowNull:false
    },
    lastname:{
      type:  DataTypes.STRING(120),
      allowNull:false
    },
    email: {
      type:  DataTypes.STRING(120),
      allowNull:false,
      unique: true,
      validate: {
        isEmail: true
      }
      
    },
    password: {
      type:  DataTypes.STRING(64),
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    freezeTableName: true
  });
  return User;
};