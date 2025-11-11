/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD na relação entre filme e genero.
 * Data: 05/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const filmeGeneroDAO = require("../../model/DAO/filme_genero.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const listarFilmesGeneros = async () => {

    try {

        // Cópia do objeto DEFAULT_MESSAGES
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        let result = await filmeGeneroDAO.getSelectAllFilmsGenres()

        if (result) {
            if (result.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.films_genres = result

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

const buscarFilmeGeneroId = async (id) => {


    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let result = await filmeGeneroDAO.getSelectFilmsGenresById(id)

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

const listarGenerosFilmeId = async (filme_id) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(filme_id) && filme_id != '' && filme_id != null && filme_id > 0) {

            let result = await filmeGeneroDAO.getSelectGenresByIdFilms(filme_id)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.genres = result

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

const listarFilmesGeneroId = async (genero_id) => {


    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(genero_id) && genero_id != '' && genero_id != null && genero_id > 0) {

            let result = await filmeGeneroDAO.getSelectFilmsByIdGenres(genero_id)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.films = result

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

const inserirFilmeGenero = async (filmeGenero, contentType) => {
    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilmeGenero(filmeGenero)

            if (!validar) {

                //Processamento
                //Chamando função para inserir o genero no BD
                let result = await filmeGeneroDAO.setInsertFilmsGenres(filmeGenero)

                if (result) {

                    let lastId = await filmeGeneroDAO.getSelectLastId()

                    if (lastId) {
                        
                        filmeGenero.id = lastId.filme_genero_id
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.created_film_genre = filmeGenero

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

const atualizarFilmeGenero = async (id, filmeGenero, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilmeGenero(filmeGenero)

            if (!validar) {

                let validarId = await buscarFilmeGeneroId(id)

                if (validarId.status_code == 200) {

                    filmeGenero.id = Number(id)

                    //Processamento
                    //Chamando função para inserir o genero no BD
                    let result = await filmeGeneroDAO.setUpdateFilmsGenres(id, filmeGenero)

                    if (result) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filme_genero = filmeGenero

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

const excluirFilmeGenero = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let validarId = buscarFilmeGeneroId()

        if (validarId) {

            let result = filmeGeneroDAO.setDeleteFilmsGenres(id) 

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

const validarDadosFilmeGenero = async (filmeGenero) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (filmeGenero.filme_id < 0 || isNaN(filmeGenero.filme_id) || filmeGenero.filme_id == "" || filmeGenero.filme_id == undefined || filmeGenero.filme_id == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID_FILME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(filmeGenero.genero_id < 0 || isNaN(filmeGenero.genero_id) || filmeGenero.genero_id == "" || filmeGenero.genero_id == undefined || filmeGenero.genero_id == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID_GENERO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false

    }

}

module.exports = {
    listarFilmesGeneros,
    listarGenerosFilmeId,
    listarFilmesGeneroId,
    buscarFilmeGeneroId,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero
}