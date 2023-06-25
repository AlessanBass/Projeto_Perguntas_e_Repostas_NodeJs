const express = require("express"); //Importando o Express
const app = express(); // Iniciando o express
const porta = 4000;

//Utilizando para processos de configuração
/* 
    Por padrão é necessário criar uma pasta chmada "view" onde
    vamos colocar todo o nosso html para que o ejs possa acessar.
*/
app.set('view engine', 'ejs'); //Seta o ejs

//Rota principal da aplicação
app.get("/", function(req, res){
    //Mostrando o html
    /* 
        Neste caso não precisamos passar o caminho completo,
        pois o "render" olha direto na pasta view
    */
    res.render("index")
});
//Criando o servidor
app.listen(porta, function(erro){
    if(erro){
        console.log(erro)
    }else{
        console.log("Servidor rodando na porta " + porta + "!");
    }
})