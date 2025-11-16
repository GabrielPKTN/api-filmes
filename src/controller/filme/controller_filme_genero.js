/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD na relação entre filme e genero.
 * Data: 05/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const filmeGeneroDAO = require("../../model/DAO/filme-dao/filme_genero.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const listarFilmesGeneros = async () => {

    try {

        // Cópia do objeto DEFAULT_MESSAGES
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        let resultFilmeGenero = await filmeGeneroDAO.getSelectAllMoviesGenres()

        if (resultFilmeGenero) {
            if (resultFilmeGenero.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.movies_genres = resultFilmeGenero

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

            let resultFilmeGenero = await filmeGeneroDAO.getSelectMoviesGenresById(id)

            if (resultFilmeGenero) {
                if (resultFilmeGenero.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.movie_genre = resultFilmeGenero
                    
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

const listarGenerosFilmeId = async (id_filme) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id_filme) && id_filme != '' && id_filme != null && id_filme > 0) {

            let resultFilmeGenero = await filmeGeneroDAO.getSelectGenresByIdMovies(id_filme)

            if (resultFilmeGenero) {
                if (resultFilmeGenero.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status                  = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code             = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.movie_genres      = resultFilmeGenero
                    
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

const listarFilmesGeneroId = async (id_genero) => {


    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id_genero) && id_genero != '' && id_genero != null && id_genero > 0) {

            let resultFilmeGenero = await filmeGeneroDAO.getSelectMoviesByIdGenres(id_genero)

            if (resultFilmeGenero) {
                if (resultFilmeGenero.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.movies = resultFilmeGenero
                    
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
                let resultFilmeGenero = await filmeGeneroDAO.setInsertMoviesGenres(filmeGenero)

                if (resultFilmeGenero) {

                    let filmeGeneroCriado = await filmeGeneroDAO.getSelectLastMovieGenre()

                    if (filmeGeneroCriado) {
                        
                        MESSAGES.DEFAULT_HEADER.status                      = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                 = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                     = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.created_movie_genre    = filmeGeneroCriado

                        return MESSAGES.DEFAULT_HEADER

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
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
                    let result = await filmeGeneroDAO.setUpdateMoviesGenres(id, filmeGenero)

                    if (result) {

                        filmeGeneroAtualizado = buscarFilmeGeneroId(id)

                        MESSAGES.DEFAULT_HEADER.status                      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                 = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                     = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.updated_movie_genre   = filmeGeneroAtualizado

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
        
        let validarId = await buscarFilmeGeneroId(id)

        if (validarId) {

            let result = await filmeGeneroDAO.setDeleteMoviesGenres(id) 

            if (result) {

                MESSAGES.DEFAULT_HEADER.status                      = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code                 = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message                     = MESSAGES.SUCCESS_DELETE.message
                MESSAGES.DEFAULT_HEADER.items.deleted_movie_genre   = validarId.items.movie_genre

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

const validarDadosFilmeGenero = async (filme_genero) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (filme_genero.id_filme < 0 || isNaN(filme_genero.id_filme) || filme_genero.id_filme == "" || filme_genero.id_filme == undefined || filme_genero.id_filme == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID_FILME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(filme_genero.id_genero < 0 || isNaN(filme_genero.id_genero) || filme_genero.id_genero == "" || filme_genero.id_genero == undefined || filme_genero.id_genero == null) {

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