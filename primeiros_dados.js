const sequelize = require("./models/sequelize");
const User = require("./models/user");

const insertUser = async (nome, email, senha, admin) => {
  try {
    const newUser = await User.create({
      nome: nome,
      email: email,
      senha: senha,
      admin: admin,
    });

    console.log("Usuário Inserido com Sucesso:", newUser.toJSON());
  } catch (error) {
    console.error("Erro ao cadastrar Usuário:", error);
  }
};

insertUser("Hendrius Félix", "hendriusfelix@gmail.com", "123", true);
insertUser("Maria Clara", "mariaclara@gmail.com", "123");
