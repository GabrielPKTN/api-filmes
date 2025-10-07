/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD de filmes.
 * Data: 07/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const filmeDAO = require("../../model/dao/filme.js")
const MESSAGES = require("../modulo/config_messages.js")

const listarFilmes = async () => {
    //Chama a função de DAO para retornar a listas de filmes
    let resultFilmes = await filmeDAO.getSelectAllFilms()
    console.log(resultFilmes)

    if(resultFilmes) {
        if (resultFilmes.lenght > 0) {
            MESSAGES.MESSAGE_HEADER.status          = MESSAGES.MESSAGE_REQUEST_SUCCES.status
            MESSAGES.MESSAGE_HEADER.status_code     = MESSAGES.MESSAGE_REQUEST_SUCCES.status_code
            MESSAGES.MESSAGE_HEADER.items.filme     = resultFilmes

            return MESSAGES.MESSAGE_HEADER
        }
    }

}

const buscarFilmeId = async () => {
    
}

// Insere um filme
const inserirFilme = async () => {

}

//Atuualiza um filme pelo ID
const atualizarFilme = async (filme, id) => {
    
}

//Exclui um filme pelo ID
const excluirFilme = async (id) => {

}

module.exports = {
    listarFilmes
}