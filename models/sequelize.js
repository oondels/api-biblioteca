const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const sequelize = new Sequelize({
  dialect: config.dialect,
  storage: config.storage,
});

module.exports = sequelize;
