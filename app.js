const express = require("express");
const body = require("body-parser");
const bcrypt = require("bcryptjs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { User, Livro, Emprestimo, Comentario } = require("./models/index");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
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

app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
    const isValidPassword = bcrypt.compare(senha, user.senha);

    if (!user) {
      return res.status(404).json({ error: "Usuário não Encontrado!" });
    }
    if (!isValidPassword) {
      return res.status(401).json({ error: "Senha Inválida" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        admin: user.admin,
      },
      "secretKey",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Erro ao buscar Usuários:", error);
  }
});

app.get("/", async (req, res) => {
  let livros;
  try {
    livros = await Livro.findAll();
    console.log("Todos os livros:", livros);
  } catch (error) {
    console.error("Não foi possível buscar os livros:", error);
  }
  res.render("biblioteca", { livros });
});
