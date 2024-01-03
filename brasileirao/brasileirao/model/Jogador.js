module.exports = class Jogador {
  
  constructor() {
	  this.id = 0;
    this.nome = "";
    this.data_nascimento = "";
	  this.senha = "";
    this.data_primeiro_jogo = "";
    this.id_clube = 0;
  }  
  
  inserir(connection) {
    var sql = "INSERT INTO jogador (nome, data_nascimento, id_clube, senha, data_primeiro_jogo) VALUES(?, str_to_date(?, '%d/%m/%Y'), ?, md5(?), str_to_date(?, '%d/%m/%Y %H:%i:%s'))";

    connection.query(sql, [this.nome, this.data_nascimento, this.id_clube, this.senha, this.data_primeiro_jogo],       function (err, result) {
      if (err) throw err;
      });
  }

  listar(connection, callback) { 
    var sql = "SELECT id, nome, date_format(data_nascimento, '%d/%m/%Y') as data_nascimento, "+
	                  "date_format(data_primeiro_jogo, '%d/%m/%Y %H:%i:%s') as data_primeiro_jogo, "+
	                  " id_clube, senha FROM jogador";

    connection.query(sql, function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  buscarPorId(connection, callback) {
    var sql = "SELECT id, nome, date_format(data_nascimento, '%d/%m/%Y') as data_nascimento, "+
	                  "date_format(data_primeiro_jogo, '%d/%m/%Y %H:%i:%s') as data_primeiro_jogo, "+
	                  " id_clube, senha FROM jogador WHERE id = ?";
					  
    connection.query(sql, [this.id], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  excluir(connection) {
    var sql = "DELETE FROM jogador WHERE id = ?";

    connection.query(sql, [this.id],       function (err, result) {
      if (err) throw err;
      });
  }
  
  atualizar(connection) {
    var sql = "UPDATE jogador SET nome=?, data_nascimento=str_to_date(?, '%d/%m/%Y'), id_clube=?, senha=md5(?), data_primeiro_jogo=str_to_date(?, '%d/%m/%Y %H:%i:%s') WHERE id=?";

    connection.query(sql, [this.nome, this.data_nascimento, this.id_clube, this.senha, this.data_primeiro_jogo, this.id],       function (err, result) {
      if (err) throw err;
      });
  }

}