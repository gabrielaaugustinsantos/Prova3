module.exports = class Clube {
  
  constructor() {
	  this.id = 0;
    this.nome = "";
    this.sigla = "";
    this.ano = 0;
    this.cidade = "";
    this.estado = "";
  }
  
  inserir(connection) {
    try {
		var sql = "INSERT INTO clube (nome,sigla,ano_fundacao,cidade,estado) VALUES(?, ?, ?, ?, ?)";

		connection.query(sql, [this.nome, this.sigla, this.ano, this.cidade, this.estado],       function (err, result) {
		  if (err) throw err;
		  });
	} catch (e) {
		throw e;
	}
  }
  
  listar(connection, callback) {
    var sql = "SELECT * FROM clube";

    connection.query(sql, function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }
  
  buscarPorId(connection, callback) {
    var sql = "SELECT * FROM clube WHERE id = ?";

    connection.query(sql, [this.id], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }
  
  excluir(connection) {
    var sql = "DELETE FROM clube WHERE id = ?";

    connection.query(sql, [this.id],       function (err, result) {
      if (err) throw err;
      });
  }
  
  atualizar(connection) {
    var sql = "UPDATE clube SET nome=?, sigla=?, ano_fundacao=?, cidade=?, estado=? WHERE id=?";

    connection.query(sql, [this.nome, this.sigla, this.ano, this.cidade, this.estado, this.id],       function (err, result) {
      if (err) throw err;
      });
  }

  
}




