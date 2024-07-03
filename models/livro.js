const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Livro = sequelize.define("Livro", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  ano: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = Livro;
