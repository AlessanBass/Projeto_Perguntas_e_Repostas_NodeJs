const express = require("express"); //Importando o Express
const app = express(); // Iniciando o express




//Criando o servidor
app.listen(4000, function(erro){
    if(erro){
        console.log(erro)
    }else{
        console.log("Servidor iniciado com sucesso!");
    }
})