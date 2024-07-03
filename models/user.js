const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const User = sequelize.define("User", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false,
    defaultValue: false,
  },
});

module.exports = User;
