/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD de filmes.
 * Data: 07/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const filmeDAO = require("../../model/dao/filme.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const listarFilmes = async () => {
    try {

        // Cópia do objeto DEFAULT_MESSAGES
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
        //Chama a função de DAO para retornar a listas de filmes
        let resultFilmes = await filmeDAO.getSelectAllFilms()

        if(resultFilmes) {
            if (resultFilmes.length > 0) {
                MESSAGES.DEFAULT_HEADER.status       = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code  = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filme  = resultFilmes

                
                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    

}

const buscarFilmeId = async (id) => {
    
    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do id
        if(!isNaN(id) && id != '' && id != null && id > 0) {

            let resultFilme = await filmeDAO.getSelectByIdFilms(Number(id))
            
            if(resultFilme) {
                if(resultFilme.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status       = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code  = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme  = resultFilme

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

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
    listarFilmes,
    buscarFilmeId
}