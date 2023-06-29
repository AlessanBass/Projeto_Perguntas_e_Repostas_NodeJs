const Sequelize = require('sequelize');
const connection = new Sequelize('projeto_perguntas', 'root', '*******',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = connection;