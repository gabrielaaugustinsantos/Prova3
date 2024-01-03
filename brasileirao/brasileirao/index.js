const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));

app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "brasileirao"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Banco de dados conectado!");
});

app.get('/', function(req, res){
	res.render('index.ejs');
});


/* Implementação do Cadastro de Clubes */

const Clube = require('./model/Clube');

app.get('/clubes', function(req, res){
 
  var clube = new Clube();  
  clube.listar(con, function(result){
    res.render('clubes/lista.ejs', {clubes: result});
  });
  
});

app.post('/formClube', function(req, res){
	var a = req.body.acao;

	if (a == "Excluir") {
		var clube = new Clube();  
		clube.id = req.body.id;
	
		var retorno = clube.excluir(con);
	
		res.render('clubes/resultado.ejs');
	} else {
		if (a == "Inserir") {
			var clube = new Clube();  

			res.render('clubes/form.ejs', {acao: a, club: clube});
		} else {		
			var clube = new Clube();  
			clube.id = req.body.id;
	
			clube.buscarPorId(con, function(result){
				clube.nome = result[0].nome;
				clube.sigla = result[0].sigla;
				clube.ano = result[0].ano_fundacao;
				clube.cidade = result[0].cidade;
				clube.estado = result[0].estado;
				
				res.render('clubes/form.ejs', {acao: a, club: clube});
			});
		}
	}
});


app.post('/salvarClube', function(req, res){
	var a = req.body.acao;
	var clube = new Clube();  
	
	clube.id = req.body.id;
	clube.nome = req.body.nome;
	clube.sigla = req.body.sigla;
	clube.ano = req.body.ano;
	clube.cidade = req.body.cidade;
	clube.estado = req.body.estado;
	
	if (a == "Inserir") {
		clube.inserir(con);
	} else {
		clube.atualizar(con);
	}
	
	res.render('clubes/resultado.ejs');
}); 



/* Implementação do Cadastro de Jogadores */

const Jogador = require('./model/Jogador');

app.get('/jogadores', function(req, res){
  
  var jogador = new Jogador();  
  jogador.listar(con, function(result){
    res.render('jogadores/lista.ejs', {jogadores: result});
  });
  
});

app.post('/formJogador', function(req, res){
	var a = req.body.acao;

	if (a == "Excluir") {
			var jogador = new Jogador();  
			jogador.id = req.body.id;
		
			var retorno = jogador.excluir(con);
		
			res.render('jogadores/resultado.ejs');
	} else {
		if (a == "Inserir") {
			var jogador = new Jogador();  
			var clube = new Clube();  
			
			clube.listar(con,  function(result){
				res.render('jogadores/form.ejs', {acao: a, jog: jogador, clubes: result});
			});	
		} else {		
			var jogador = new Jogador();  
			var clube = new Clube();  
			
			jogador.id = req.body.id;
			
			jogador.buscarPorId(con, function(result){
				jogador.nome = result[0].nome;
				jogador.data_nascimento = result[0].data_nascimento;
				jogador.senha = result[0].senha;
				jogador.data_primeiro_jogo = result[0].data_primeiro_jogo;
				jogador.id_clube = result[0].id_clube;

				clube.listar(con,  function(result2){
					res.render('jogadores/form.ejs', {acao: a, jog: jogador, clubes: result2});
				});	
			});	
		}
	}
});


app.post('/salvarJogador', function(req, res){
	var a = req.body.acao;
	var jogador = new Jogador();  
	
	jogador.id = req.body.id;
	jogador.nome = req.body.nome;
	jogador.data_nascimento = req.body.data;
	jogador.data_primeiro_jogo = req.body.data_jogo;
	jogador.senha = req.body.senha;
	jogador.id_clube = req.body.clube;
	
	if (a == "Inserir") {
		jogador.inserir(con);
	} else {
		jogador.atualizar(con);
	}
	
	res.render('jogadores/resultado.ejs');
	
});

