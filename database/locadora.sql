CREATE DATABASE db_locadora_filme_ds2m_25_2;

USE db_locadora_filme_ds2m_25_2;

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

INSERT INTO tb_filmes (nome, sinopse, data_lancamento, 
						duracao, orcamento, trailer, capa)
VALUES (
	'Nós',
	' Adelaide (Lupita Nyongo) e Gabe 
	(Winston Duke) decidem levar a família 
	para passar um fim de semana na praia e 
	descansar em uma casa de veraneio. Eles viajam com 
	os filhos e começam a aproveitar o ensolarado local, 
	mas a chegada de um grupo misterioso muda tudo e a 
	família se torna refém de seus próprios duplos.',
	'2019-03-21',
	'02:00',
	20000000,
	'https://geo.dailymotion.com/player/x94ei.html?',
	'https://br.web.img3.acsta.net/c_310_420/pictures/19/02/07/14/16/5034340.jpg'
);

INSERT INTO tb_filmes (nome, sinopse, data_lancamento, 
						duracao, orcamento, trailer, capa)
VALUES (
	'A Noiva-Cadáver',
	'A Noiva-Cadáver se passa em um vilarejo europeu do século XIX, 
	onde vive Victor Van Dorst (Johnny Depp), um jovem que está prestes 
	a se casar com Victoria Everglot (Emily Watson). Porém, acidentalmente, 
	Victor se casa com a Noiva-Cadáver (Helena Bonham Carter), que o
	leva para conhecer a Terra dos Mortos. Desejando desfazer o ocorrido 
	para poder enfim se casar com Victoria, aos poucos Victor percebe 
	que a Terra dos Mortos é bem mais animada do que o meio vitoriano em que nasceu e cresceu.',
	'2005-10-21',
	'01:17',
	40000000,
	'https://geo.dailymotion.com/player/x94ei.html?',
	'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/91/33/59/20140728.jpg'
);
