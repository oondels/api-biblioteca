const User = require("./user");
const Livro = require("./livro");
const Emprestimo = require("./emprestimo");
const Comentario = require("./comentario");

User.belongsToMany(Comentario, { through: "UserComentario" });
Comentario.belongsToMany(User, { through: "UserComentario" });

Livro.hasMany(Comentario);
Comentario.belongsTo(Livro);

User.hasMany(Emprestimo);
Emprestimo.belongsTo(User);

Livro.belongsToMany(Emprestimo, { through: "LivroEmprestimo" });
Emprestimo.belongsToMany(Livro, { through: "LivroEmprestimo" });

module.exports = {
  User,
  Livro,
  Emprestimo,
  Comentario,
};
