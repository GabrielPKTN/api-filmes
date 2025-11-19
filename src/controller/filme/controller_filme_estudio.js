/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD na relação entre filme e estudio.
 * Data: 18/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const filmeEstudioDAO = require("../../model/DAO/filme-dao/filme_estudio.js") 
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const controllerEstudio = require("../estudio/controller_estudio.js")
const controllerFilme = require("./controller_filme.js")

//Lista todos as relações entre filme e estudio.
const listarFilmesEstudios = async () => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        resultFilmeEstudio = await filmeEstudioDAO.getSelectMoviesStudios()

        if(resultFilmeEstudio) {

            if(resultFilmeEstudio.length > 0) {

                MESSAGES.DEFAULT_HEADER.status                  = MESSAGES.SUCCES_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code             = MESSAGES.SUCCES_REQUEST.status_code 
                MESSAGES.DEFAULT_HEADER.items.movie_studio      = resultFilmeEstudio

            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }

        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

//Retorna uma relação entre filme e estudio pelo id da relação.
const listarFilmeEstudioId = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
     
        if (!isNaN(id) && id > 0 && id != undefined && id != null && id != "") {

            resultFilmeEstudio = await filmeEstudioDAO.getSelectMovieStudioById(id)

            if (resultFilmeEstudio) {

                if (resultFilmeEstudio.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCES_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCES_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.movie_studio  = resultFilmeEstudio

                    return MESSAGES.DEFAULT_HEADER // 201

                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
                
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

//Lista os filmes relacionados com um estudio pelo id do estudio.
const listarFilmesEstudioId = async (id_estudio) => {

     MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
     
        validarIdEstudio = await controllerEstudio.buscarEstudioId(id_estudio)

        if (validarIdEstudio.status_code == 200) {

            resultFilmeEstudio = await filmeEstudioDAO.getSelectMoviesByStudioId(id_estudio)

            if (resultFilmeEstudio) {

                if (resultFilmeEstudio.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCES_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCES_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.movie_studio  = resultFilmeEstudio

                    return MESSAGES.DEFAULT_HEADER // 201

                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
                
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

//Lista os estudios relacionados com um filme pelo id do filme.
const listarEstudiosFilmeId = async (id_filme) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        validarIdFilme = await controllerFilme.buscarFilmeId(id_filme)

        if (validarIdEstudio.status_code == 200) {

            resultFilmeEstudio = await filmeEstudioDAO.getSelectStudiosByMovieId(id_filme)

            if (resultFilmeEstudio) {

                if (resultFilmeEstudio.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCES_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCES_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.movie_studio  = resultFilmeEstudio

                    return MESSAGES.DEFAULT_HEADER // 201

                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
                
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

//Insere uma relação entre filme e estudio.
const insereFilmeEstudio = async (filme_estudio, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validarDados = validarDadosFilmeEstudio(filme_estudio)

            if(!validarDados) {

                resultFilmeEstudio = await filmeEstudioDAO.setInsertMovieStudio(filme_estudio)

                if(resultFilmeEstudio) {

                    filmeInserido = await filmeEstudioDAO.getSelectLastMovieStudio()

                    if (filmeInserido) {

                        MESSAGES.DEFAULT_HEADER.status                          = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                     = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                         = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.movie_studio_created      = filmeInserido

                    } else {    
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }

            } else {
                return validarDados // 400
            }

        } else {
            MESSAGES.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }


}

//Atualiza uma relação entre filme e estudio.
const atualizaFilmeEstudio = async (id, filme_estudio, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validarId = await listarFilmeEstudioId(id)

            if(validarId.status_code == 200) {

                validarDados = validarDadosFilmeEstudio(filme_estudio) 

                if(!validarDados) {

                    resultFilmeEstudio = filmeEstudioDAO.setUpdateMovieStudio(id, movie_studio)

                    if (resultFilmeEstudio) {

                        registroAtualizado = await listarFilmeEstudioId(id)

                        if (registroAtualizado.status_code == 200) {

                            MESSAGES.DEFAULT_HEADER.status                      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code                 = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message                     = MESSAGES.SUCCESS_UPDATE_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items.updated_movie_studio  = registroAtualizado.items.movie_studio

                            return MESSAGES.DEFAULT_HEADER // 200

                        } else {

                            return registroAtualizado // 500, 404, 400

                        }

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                } else {

                    return validarDados // 400

                }

            } else {

                return validarId // 500, 404, 400

            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
        

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

//Deleta uma relação entre filme e estudio.
const deleteFilmeEstudio = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        validarId = await listarFilmeEstudioId(id)

        if (validarId.status_code == 200) {

            resultFilmeEstudio = await filmeEstudioDAO.setDeleteMovieStudio(id)

            if (resultFilmeEstudio) {

                MESSAGES.DEFAULT_HEADER.status                          = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code                     = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message                         = MESSAGES.SUCCESS_DELETE.message
                MESSAGES.DEFAULT_HEADER.items.deleted_movie_studio      = validarId

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            return validarId // 500, 404, 400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

//Valida dados vindos do json da requisição.
const validarDadosFilmeEstudio = async (filme_estudio) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (filme_estudio.id_filme < 0 || isNaN(filme_estudio.id_filme) || filme_estudio.id_filme == "" || filme_estudio.id_filme == undefined || filme_estudio.id_filme == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID_FILME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(filme_estudio.id_estudio < 0 || isNaN(filme_estudio.id_estudio) || filme_estudio.id_estudio == "" || filme_estudio.id_estudio == undefined || filme_estudio.id_estudio == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID_ESTUDIO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false

    }

}

module.exports = {
    listarFilmesEstudios,
    listarFilmeEstudioId,
    listarFilmesEstudioId,
    listarEstudiosFilmeId,
    insereFilmeEstudio,
    atualizaFilmeEstudio,
    deleteFilmeEstudio
}