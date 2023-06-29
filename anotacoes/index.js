const express = require("express"); //Importando o Express
const app = express(); // Iniciando o express
const porta = 4000;

//Utilizando para processos de configuração
/* 
    Por padrão é necessário criar uma pasta chmada "view" onde
    vamos colocar todo o nosso html para que o ejs possa acessar.
*/
app.set('view engine', 'ejs'); //Seta o ejs
/* Usando arquivos estátivos */
app.use(express.static('public'));

//Rota principal da aplicação
app.get("/", function(req, res){
    var produtos =[
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca-Cola", preco: 5.14},
        {nome: "Leite", preco: 10.14}
    ]
    //Mostrando o html
    /* 
        Neste caso não precisamos passar o caminho completo,
        pois o "render" olha direto na pasta view
    */
    var nome = "Alessandro C. Santos"
    var idade = "24"
    /* 
        Agora vamos passar esses valores que quremos usar no HTML
    */
    res.render("index",{
        nome: nome,
        idade : idade,
        habilitado: true,
        produtos: produtos
    });
});
//Criando o servidor
app.listen(porta, function(erro){
    if(erro){
        console.log(erro)
    }else{
        console.log("Servidor rodando na porta " + porta + "!");
    }
})