const express = require("express"); //Importando o Express
const app = express(); // Iniciando o express
const porta = 4000;
const connection = require("./database/database");/* puxa a conexão com o banco */
const perguntaModel = require("./database/Pergunta"); //Importando o model
const respostaModel = require("./database/Resposta");

// DATABSE
connection
    .authenticate()/* Veifica se consegiu se concetar com o bancon */
    .then(()=>{ /* Executa se conectar (sucesso) */
        console.log("Conexão bem sucedida com o banco de dados!");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

//Utilizando para processos de configuração
/* 
    Por padrão é necessário criar uma pasta chmada "view" onde
    vamos colocar todo o nosso html para que o ejs possa acessar.
*/
app.set('view engine', 'ejs'); //Seta o ejs
/* Usando arquivos estátivos */
app.use(express.static('public'));

/* Necessário para pegar dados de formulários */
app.use(express.json()); /* Ler dados em formato JSON */
app.use(express.urlencoded({ extended: true})); /* Decodifica os dados */

//Rota principal da aplicação
app.get("/", function(req, res){
    /* Retorna todos os dados da tabela */
    perguntaModel.findAll({raw:true, order:[
        ['id', 'DESC']
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    });
    
});

app.get("/perguntar", function(req, res){
    res.render("perguntar");
});

/* Uitilizado para receber dados do formulário */
app.post("/salvarpergunta", function(req, res){
    /* Pegando os dados */
    var titulo = req.body.titulo;
    var descricao = req.body.descricao; /* Name dado lá no input */
    //Create responsável por salvar o dados
    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    })
});

app.get("/pergunta/:id", function(req, res){
    var id = req.params.id;
    /* Busca apenas um dado */
    perguntaModel.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){

            respostaModel.findAll({
                where: {perguntaId : pergunta.id },
                order: [['id', 'DESC']]
            }).then(respostas =>{
                res.render("pergunta", {
                    pergunta : pergunta,
                    respostas : respostas,
                    numRespostas: respostas.length
                })
            })

            
        }else{
            res.redirect("/");
        }
    })
});

app.post("/responder", (req, res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    respostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId);
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