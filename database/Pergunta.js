/* Models tem a primeira letra maiuscula */
const Sequelize = require('sequelize');
const connection = require('./database');

/* Criando o model */
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false /* Not Null */
    },

    descricao:{
        type: Sequelize.TEXT,
        allowNull: false /* Not Null */
    }
}); /* Define o nome da tabela */

/* Criando a tabela no banco */
/* Sincroniza com o banco, se já existir a tabela ele não força a criação */
Pergunta.sync({force: false}).then(()=>{});

module.exports = Pergunta;