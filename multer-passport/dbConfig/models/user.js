const bcrypt = require("bcryptjs");

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, {
        foreignKey: "created_by",
      });
      User.hasMany(models.Category);
    }
  }
  User.init(
    {
      profileImg: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      firstname: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
          is: /^.+$/i,
        },
      },
      lastname: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
          is: /^.+$/i,
        },
      },
      username: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
        validate: {
          is: /^.+$/i,
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          is: /^.+$/i,
        },
      },
      role: {
        type: DataTypes.STRING(120),
        allowNull: false,
        defaultValue: "moderator",
        set(value) {
          if (value === "admin" || value === "moderator") {
            this.setDataValue("role", value);
          } else {
            throw new Error("Role input is wrong!");
          }
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (User, option) => {
          User.password = bcrypt.hashSync(User.password, 10);
        },
        beforeBulkUpdate: (User, where) => {
          if(User.attributes.password !== undefined){
            User.attributes.password = bcrypt.hashSync(User.attributes.password, 10);
          }
        },
      },
      sequelize,
      freezeTableName: true,
      timestamps: false,
      modelName: "User",
    }
  );
  return User;
};
