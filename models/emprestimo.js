const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Emprestimo = sequelize.define("Emprestimo", {
  dataRetirada: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  dataDevolucao: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  dataDevolvido: {
    type: DataTypes.DATE,
    allowNull: true,
    unique: false,
  },
  // Deve ser preenchido apenas quando o livro for devolvido
  avaliacao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  },
  devolucao: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Emprestimo;
