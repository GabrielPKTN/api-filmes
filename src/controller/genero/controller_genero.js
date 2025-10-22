/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD de genero.
 * Data: 07/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const generoDAO = require("../../model/dao/genero.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const listarGeneros = async () => {

    try {

        // Cópia do objeto DEFAULT_MESSAGES
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        let resultGeneros = await generoDAO.getSelectAllGenre()

        if (resultGeneros) {
            if (resultGeneros.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.genres = resultGeneros

                return MESSAGES.DEFAULT_HEADER

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

const buscarGeneroId = async (id) => {

}

const inserirGenero = async (genero, contentType) => {

}

const atualizarGenero = async (id, genero, contentType) => {

}

const excluirGenero = async (id) => {

}

const validarDadosGenero = async (genero) => {

}

module.exports = {
    listarGeneros
}