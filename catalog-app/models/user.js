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
      User.hasMany(models.Category, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      User.hasMany(models.Product, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  User.init({
    profileImage:{
      type: DataTypes.STRING
    },
    firstname: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        is: /^.+$/i
      }
    },
    lastname: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        is: /^.+$/i
      }
    },
    username: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: {
        is: /^.+$/i
      }
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        is: /^.+$/i
      }
    },
    role: {
      type: DataTypes.STRING(64),
      defaultValue: 'moderator',
      allowNull: false,
      set(value){
        if(value === 'moderatot' || value === 'admin'){
          this.setDataValue('role',value);
        }else{
          throw new Error ('role value is wrong')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    freezeTableName: true,
    paranoid: true
  });
  return User;
};