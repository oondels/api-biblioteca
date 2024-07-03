const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Comentario = sequelize.define("Comentario", {
  coment: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  like: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
    defaultValue: 0,
  },
});

module.exports = Comentario;
