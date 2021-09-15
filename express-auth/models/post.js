'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Author);
    }
  };
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^.{1,160}$/i
      }
    },
    content: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^.{1,}$/i
      }
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'Personal'
    }
  }, {
    sequelize,
    modelName: 'Post',
    freezeTableName: true,
    timestamps:false
  });
  return Post;
};