const {Sequelize, DataTypes} = require('sequelize')

const sequelize = require("../config/connection");

const Character = sequelize.define('Character',{
  
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    forcePoints: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    }
},{
    timestamps: false
})


Character.sync({
    
});

module.exports = Character;