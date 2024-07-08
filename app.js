const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const path = require("path");
const { User, Livro, Emprestimo, Comentario } = require("./models/index");
const sequelize = require("./models/sequelize");

const app = express();

// Configuração bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const authLogin = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).redirect("/login");
  }
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register-user", async (req, res) => {
  const { nome, email, senha } = req.body;

  const encryptedPassWord = await bcrypt.hash(senha, 10);

  try {
    const newUser = await User.create({
      nome,
      email,
      senha: encryptedPassWord,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Não foi possível realizar o cadastro:", error);
  }
});

app.post("/login-token", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não Encontrado!" });
    }

    const isValidPassword = await bcrypt.compare(senha, user.senha);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Senha Inválida" });
    }

    req.session.userId = user.id;
    req.session.userAdmin = user.admin;

    res.redirect(`/?userId=${user.id}`);
  } catch (error) {
    console.error("Erro ao buscar Usuários:", error);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/", async (req, res) => {
  let livros;
  let comentarios;
  let livrosEmprestados;
  const userId = req.query.userId;
  const user = await User.findByPk(userId);

  try {
    livros = await Livro.findAll();
    //  busque dados relacionados de User ao mesmo tempo que Livros
    comentarios = await Comentario.findAll({
      include: User,
    });

    // Pesquisa os livros emprestados
    livrosEmprestados = await Livro.findAll({
      include: [
        {
          model: Emprestimo,
          where: { devolucao: false },
        },
      ],
    });

    // Pesquisa os livros emprestados
    const usersEmprestimos = await Emprestimo.findAll({
      where: { UserId: userId, devolucao: false },
      include: [
        {
          model: Livro,
        },
      ],
    });

    console.log("Dados Encontrados");

    res.render("biblioteca", {
      livros,
      user,
      comentarios,
      livrosEmprestados,
      usersEmprestimos,
    });
  } catch (error) {
    console.error("Não foi possível buscar os dados:", error);
  }
});

app.post("/post-coment", async (req, res) => {
  const comentData = req.body;

  try {
    await Comentario.create({
      coment: comentData.coment,
      LivroId: comentData.livro,
      UserId: comentData.user,
    });
    console.log("Comentário Cadastrado com Sucesso!");
  } catch (error) {
    console.error("Erro ao Cadastrar comentário:", error);
  }

  res.json(comentData);
});

app.get("/emprestimo", (req, res) => {
  const livroId = req.query.livroId;

  res.render("emprestimo", { livroId });
});

app.post("/emprestimo", authLogin, async (req, res) => {
  const { dataRetirada, diasAluguel, livroId } = req.body;

  const calcDiasAluguel = (data, dias) => {
    const partesData = data.split("/"); // Divide a string de data
    const dataObj = new Date(partesData[2], partesData[1] - 1, partesData[0]); // Cria um objeto Date a partir das partes da data
    dataObj.setDate(dataObj.getDate() + parseInt(dias)); // Atualiza a data com o número de dias fornecido

    const dia = dataObj.getDate().toString().padStart(2, "0"); // Obtém o dia com zero à esquerda se necessário
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0"); // Obtém o mês com zero à esquerda se necessário
    const ano = dataObj.getFullYear(); // Obtém o ano

    return `${dia}/${mes}/${ano}`;
  };

  const dataDevolucao = calcDiasAluguel(dataRetirada, diasAluguel);

  try {
    const newEmprestimo = await Emprestimo.create({
      dataRetirada: dataRetirada,
      dataDevolucao: dataDevolucao,
      UserId: req.session.userId,
    });

    // Adiciona os livros associados ao empréstimo
    await newEmprestimo.addLivros(livroId);

    res.json({ emprestimo: "Realizado com Sucesso! " });
  } catch (error) {
    console.error("Erro ao alugar livro:", error);
  }
});

app.get("devolver-livro", (req, res) => {});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log(
      "Conexão com Banco de Dados estabelecida. Servidor Rodanddo na Porta 3000"
    );
  });
});
