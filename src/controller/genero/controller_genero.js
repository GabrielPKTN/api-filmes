/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD de genero.
 * Data: 07/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const generoDAO = require("../../model/DAO/genero.js")
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


    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let result = await generoDAO.getSelectGenreById(id)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.genre = result

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

const inserirGenero = async (genero, contentType) => {
    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosGenero(genero)

            if (!validar) {

                //Processamento
                //Chamando função para inserir o genero no BD
                let result = await generoDAO.setInsertGenres(genero)

                if (result) {

                    let lastId = await generoDAO.getSelectLastId()

                    if (lastId) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.created_genre = lastId

                        return MESSAGES.DEFAULT_HEADER

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }

                } else {

                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500

                }

            } else {

                return validar //400

            }

        } else {

            return MESSAGES.ERROR_CONTENT_TYPE //415

        }


    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}

const atualizarGenero = async (id, genero, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosGenero(genero)

            if (!validar) {

                let validarId = await buscarGeneroId(id)

                if (validarId.status_code == 200) {

                    //Processamento
                    //Chamando função para inserir o genero no BD
                    let result = await generoDAO.setUpdateGenres(id, genero)

                    if (result) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        
                        let genre = genero.nome_genero
                        MESSAGES.DEFAULT_HEADER.items.updated_genre = {id, genre}

                        return MESSAGES.DEFAULT_HEADER //200

                    } else {

                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500

                    }

                } else {

                    return validarId // (500 ou 404 ou 400)

                }

            } else {

                return validar //400

            }

        } else {

            return MESSAGES.ERROR_CONTENT_TYPE //415

        }

    } catch (error) {

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500

    }

}

const excluirGenero = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let validarId = buscarGeneroId()

        if (validarId) {

            let result = generoDAO.setDeleteGenre(id) 

            if (result) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE.message
                delete MESSAGES.DEFAULT_HEADER.items

                return MESSAGES.DEFAULT_HEADER //200

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {

            return validarId // (500, 404, 400)

        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

const validarDadosGenero = async (genero) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (genero.nome_genero == "" || genero.nome_genero == undefined || genero.nome_genero == null || genero.nome_genero.length > 30) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false

    }

}

module.exports = {
    listarGeneros,
    buscarGeneroId,
    inserirGenero,
    atualizarGenero,
    excluirGenero
}