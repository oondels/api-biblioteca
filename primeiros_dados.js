const sequelize = require("./models/sequelize");
const Livro = require("./models/livro");

const insertLivro = async (titulo, genero, autor, ano) => {
  try {
    const newLivro = await Livro.create({
      titulo: titulo,
      genero: genero,
      autor: autor,
      ano: ano,
    });

    console.log("Livro Inserido com Sucesso:", newLivro.toJSON());
  } catch (error) {
    console.error("Erro ao cadastrar Livro:", error);
  }
};

insertLivro(
  "alice no pais das maravilhas",
  "Fantasia",
  "Robertinho alicias",
  "1984"
);
insertLivro("Harry potter", "Magia", "J. K. Roling", "2000");
