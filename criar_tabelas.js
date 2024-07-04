const sequelize = require("./models/sequelize");
const { User, Livro, Emprestimo, Comentario } = require("./models/index");

sequelize
  .sync()
  .then(() => {
    console.log("Database criada!");
  })
  .catch((error) => {
    console.log("Erro, tabelas não foram criadas.");
  });
