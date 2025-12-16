/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD na relação entre profissional e equipe.
 * Data: 16/12/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const profissionalEquipeDAO = require("../../model/DAO/profissional-dao/profissional_equipe.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const listarProfissionaisEquipes = async () => {

    try {

        // Cópia do objeto DEFAULT_MESSAGES
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        let result = await profissionalEquipeDAO.getSelectProfessionalTeams()

        if (result) {
            if (result.length > 0) {

                MESSAGES.DEFAULT_HEADER.status                      = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code                 = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.professional_team     = result

                return MESSAGES.DEFAULT_HEADER // 200

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

const buscarProfissionalEquipeId = async (id_profissional_equipe) => {


    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id_profissional_equipe) && id_profissional_equipe != '' && id_profissional_equipe != null && id_profissional_equipe > 0) {

            let result = await profissionalEquipeDAO.getSelectProfessionalTeamById(id_profissional_equipe)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status                   = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code              = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.professional_team  = result

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

const buscarEquipeIdProfissionalId = async (id_profissional) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id_profissional) && id_profissional != '' && id_profissional != null && id_profissional > 0) {

            let result = await profissionalEquipeDAO.getSelectTeamIdByProfessionalId(id_profissional)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.team_id   = result

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

const listarProfissionaisEquipeId = async (id_equipe) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id_equipe) && id_equipe != '' && id_equipe != null && id_equipe > 0) {

            let result = await profissionalEquipeDAO.getSelectProfessionalsByTeamId(id_equipe)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.professional  = result

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

const inserirProfissionalEquipe = async (profissionalEquipe, contentType) => {
    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarDadosProfissionalEquipe(profissionalEquipe)
            
            if (!validar) {

                //Processamento
                //Chamando função para inserir o genero no BD
                let result = await profissionalEquipeDAO.setInsertProfessionalTeam(profissionalEquipe)
                
                if (result) {

                    let profissionalEquipeCriado = await profissionalEquipeDAO.getSelectLastRoleProfessional()
                    
                    if (profissionalEquipeCriado) {
                        
                        MESSAGES.DEFAULT_HEADER.status                              = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                         = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                             = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.professional_team_created     = profissionalEquipeCriado
                        
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

const atualizarProfissionalEquipe = async (id, profissionalEquipe, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosProfissionalEquipe(profissionalEquipe)
            
            if (!validar) {

                let validarId = await buscarProfissionalEquipeId(id)
                
                if (validarId.status_code == 200) {

                    //Processamento
                    //Chamando função para inserir o genero no BD
                    let result = await profissionalEquipeDAO.setUpdateProfessionalTeam(id, profissionalEquipe)
                    
                    if (result) {

                        let profissionalEquipeAtualizado = await buscarProfissionalEquipeId(id)

                        MESSAGES.DEFAULT_HEADER.status                           = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                      = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                          = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.professional_team_updated  = profissionalEquipeAtualizado.items.professional_team

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

const excluirProfissionalEquipe = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let validarId = await buscarProfissionalEquipeId(id)

        if (validarId.status_code == 200) {

            let result = await profissionalEquipeDAO.setDeleteProfessionalTeamById(id) 

            if (result) {

                MESSAGES.DEFAULT_HEADER.status                          = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code                     = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message                         = MESSAGES.SUCCESS_DELETE.message
                MESSAGES.DEFAULT_HEADER.items.professional_team_deleted = validarId.items.professional_team

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

const validarDadosProfissionalEquipe = (profissionalEquipe) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (profissionalEquipe.id_profissional < 0 || isNaN(profissionalEquipe.id_profissional) || profissionalEquipe.id_profissional == "" || profissionalEquipe.id_profissional == undefined || profissionalEquipe.id_profissional == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID_PROFISSIONAL INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(profissionalEquipe.id_equipe < 0 || isNaN(profissionalEquipe.id_equipe) || profissionalEquipe.id_equipe == "" || profissionalEquipe.id_equipe == undefined || profissionalEquipe.id_equipe == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID_EQUIPE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false

    }

}

module.exports = {

    listarProfissionaisEquipes,
    buscarProfissionalEquipeId,
    buscarEquipeIdProfissionalId,
    listarProfissionaisEquipeId,
    inserirProfissionalEquipe,
    atualizarProfissionalEquipe,
    excluirProfissionalEquipe,
    validarDadosProfissionalEquipe

}