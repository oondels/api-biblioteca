const express = require("express");
const body = require("body-parser");
const path = require("path");

const app = express();

app.set("views", path.joinmt(__dirname, "views"));
app.set("view engine", "ejs");
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.get("/", (req, res) => {
  res.render("biblioteca");
});
