/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD na relação entre filme e distribuidora.
 * Data: 12/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const filmeDistribuidoraDAO = require("../../model/DAO/filme-dao/filme_distribuidora.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const listarFilmesDistribuidoras = async () => {

    try {

        // Cópia do objeto DEFAULT_MESSAGES
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        let result = await filmeDistribuidoraDAO.getSelectAllMoviesDistributor()

        if (result) {
            if (result.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.movie_distributor = result

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

const buscarFilmeDistribuidoraId = async (id) => {


    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let result = await filmeDistribuidoraDAO.getSelectMoviesDistributorsById(id)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.distributor = result

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

const listarDistribuidorasFilmeId = async (idFilme) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(idFilme) && idFilme != '' && idFilme != null && idFilme > 0) {

            let result = await filmeDistribuidoraDAO.getSelectDistributorsByIdMovies(idFilme)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.distributors = result

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

const listarFilmesDistribuidoraId = async (distribuidoraId) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(distribuidoraId) && distribuidoraId != '' && distribuidoraId != null && distribuidoraId > 0) {

            let result = await filmeDistribuidoraDAO.getSelectMoviesByIdDistributors(distribuidoraId)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.movies = result

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

const inserirFilmeDistribuidora = async (filmeDistribuidora, contentType) => {
    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilmeDistribuidora(filmeDistribuidora)
            
            if (!validar) {

                //Processamento
                //Chamando função para inserir o genero no BD
                let result = await filmeDistribuidoraDAO.setInsertMoviesDistributors(filmeDistribuidora)
                
                if (result) {

                    let filmeDistribuidoraCriado = await filmeDistribuidoraDAO.getSelectLastMovieDistributor()
                    
                    if (filmeDistribuidoraCriado) {
                        
                        MESSAGES.DEFAULT_HEADER.status                              = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                         = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                             = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.created_movie_distributor     = filmeDistribuidoraCriado
                        
                        return MESSAGES.DEFAULT_HEADER //201

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

const atualizarFilmeDistribuidora = async (id, filmeDistribuidora, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilmeDistribuidora(filmeDistribuidora)
            
            if (!validar) {

                let validarId = await buscarFilmeDistribuidoraId(id)
                
                if (validarId.status_code == 200) {

                    //Processamento
                    //Chamando função para inserir o genero no BD
                    let result = await filmeDistribuidoraDAO.setUpdateMoviesDistributors(id, filmeDistribuidora)
                    
                    if (result) {

                        let filmeDistribuidoraAtualizado = await buscarFilmeDistribuidoraId(id)

                        MESSAGES.DEFAULT_HEADER.status                          = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                     = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                         = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.updated_film_distributor  = filmeDistribuidoraAtualizado.items.distributor

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

const excluirFilmeDistribuidora = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let validarId = await buscarFilmeDistribuidoraId(id)

        if (validarId.status_code == 200) {

            let result = await filmeDistribuidoraDAO.setDeleteMoviesDistributors(id) 

            if (result) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE.message
                MESSAGES.DEFAULT_HEADER.items.deleted_movie_distributor = validarId.items.distributor

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

const validarDadosFilmeDistribuidora = async (filmeDistribuidora) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (filmeDistribuidora.id_filme < 0 || isNaN(filmeDistribuidora.id_filme) || filmeDistribuidora.id_filme == "" || filmeDistribuidora.id_filme == undefined || filmeDistribuidora.id_filme == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID_FILME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(filmeDistribuidora.id_distribuidora < 0 || isNaN(filmeDistribuidora.id_distribuidora) || filmeDistribuidora.id_distribuidora == "" || filmeDistribuidora.id_distribuidora == undefined || filmeDistribuidora.id_distribuidora == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID_DISTRIBUIDORA INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false

    }

}

// 4 21 23
// inserirFilmeDistribuidora(teste_json, "APPLICATION/JSON")
excluirFilmeDistribuidora(20)

module.exports = {

    listarFilmesDistribuidoras,
    buscarFilmeDistribuidoraId,
    listarDistribuidorasFilmeId,
    listarFilmesDistribuidoraId,
    inserirFilmeDistribuidora,
    atualizarFilmeDistribuidora,
    excluirFilmeDistribuidora,
    validarDadosFilmeDistribuidora

}