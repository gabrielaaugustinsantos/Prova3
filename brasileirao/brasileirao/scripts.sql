drop database brasileirao;
create database brasileirao;
use brasileirao;
create table clube (
	id int not null auto_increment,
    nome varchar(100),
    sigla varchar(5),
    ano_fundacao int,
    cidade varchar(200),
    estado varchar(2),
    primary key (id)
);
create table jogador (
	id int not null auto_increment,
    nome varchar(100),
    data_nascimento date,
    data_primeiro_jogo datetime,
    id_clube int,
    senha varchar(255),
    primary key (id),
	foreign key (id_clube) references clube (id)
);
insert into clube (nome, sigla, ano_fundacao, cidade, estado)
           values ('Grêmio', 'GRE', 1903, 'Porto Alegre', 'RS');
insert into clube (nome, sigla, ano_fundacao, cidade, estado)
           values ('Internacional', 'INT', 1908, 'Porto Alegre', 'RS');
insert into jogador (nome, data_nascimento, data_primeiro_jogo, id_clube, senha)
             values ('Pedro Geromel', str_to_date('21/09/1985', '%d/%m/%Y'), str_to_date('27/12/2013', '%d/%m/%Y'), 1, md5('teste'));
insert into jogador (nome, data_nascimento, data_primeiro_jogo, id_clube, senha)
             values ('Fernandão', str_to_date('18/03/1978', '%d/%m/%Y'), str_to_date('04/09/2004', '%d/%m/%Y'), 2, md5('teste'));