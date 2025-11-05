CREATE DATABASE db_locadora_filme_ds2m_25_2;

USE db_locadora_filme_ds2m_25_2;

-- CRUD PARA ATUALIZAR
CREATE TABLE tb_filmes(
	filme_id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) not null,
	sinopse TEXT null,
	data_lancamento DATE null,
	duracao TIME not null,
	orcamento DECIMAL(10, 2) not null,
	trailer VARCHAR(255) null,
	capa VARCHAR(255) not null
);

-- CRUD FEITO
CREATE TABLE tb_genero(
	genero_id INT PRIMARY KEY AUTO_INCREMENT,
	nome_genero VARCHAR(30) not null
);

-- CRUD FEITO
CREATE TABLE tb_distribuidora(
	distribuidora_id INT PRIMARY KEY AUTO_INCREMENT,
	nome_distribuidora VARCHAR(50) not null
);

-- CRUD FEITO
CREATE TABLE tb_cargo(
	cargo_id INT PRIMARY KEY AUTO_INCREMENT,
	nome_cargo VARCHAR(100) not null
);

--CRUD FEITO
CREATE TABLE tb_estudio(
	estudio_id INT PRIMARY KEY AUTO_INCREMENT,
	nome_estudio VARCHAR(50) not null
);

-- CRUD FEITO
CREATE TABLE tb_papel(
	papel_id INT PRIMARY KEY AUTO_INCREMENT,
	nome_papel VARCHAR(30) not null
);

-- CRUD FEITO
CREATE TABLE tb_idioma_dublagem(
	idioma_dublagem_id INT PRIMARY KEY AUTO_INCREMENT,
	idioma_dublador VARCHAR(5) not null
);

CREATE TABLE tb_filme_genero(
	filme_genero_id INT PRIMARY KEY AUTO_INCREMENT,
	filme_id INT,
	genero_id INT,
	FOREIGN KEY (filme_id) REFERENCES tb_filmes(filme_id),
	FOREIGN KEY (genero_id) REFERENCES tb_genero(genero_id)
);