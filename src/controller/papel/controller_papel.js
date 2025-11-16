/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD de estudio.
 * Data: 03/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const papelDAO = require("../../model/DAO/papel-dao/papel.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const listarPapeis = async () => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        const resultPapel = await papelDAO.getSelectAllPosition()

        if(resultPapel) {

            if (resultPapel.length > 0) {

                MESSAGES.DEFAULT_HEADER.status                  = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code             = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.character_roles   = resultPapel

                return MESSAGES.DEFAULT_HEADER // 200

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

const buscarPapelId = async (id) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (!isNaN(id) && id != "" && id != null && id != undefined && id > 0) {

            const resultPapel = await papelDAO.getSelectPositionById(id)

            if(resultPapel) {

                if(resultPapel.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status                  =  MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code             =  MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.character_role    =  resultPapel

                    return MESSAGES.DEFAULT_HEADER // 200

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

const inserirPapel = async (papel, contentType) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarPapel(papel)

            if (!validar) {

                const resultPapel = await papelDAO.setInsertPosition(papel)

                if (resultPapel) {

                    const papelCriado = await papelDAO.getSelectLastPosition()

                    if(papelCriado) {

                        MESSAGES.DEFAULT_HEADER.status                                  =   MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                             =   MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                                 =   MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.character_role_created            =   papelCriado

                        return MESSAGES.DEFAULT_HEADER // 200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }

            } else {
                return validar // 400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

const atualizarPapel = async (id, papel, contentType) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == "APPLICATION/JSON") {

            let validarId = await buscarPapelId(id)

            if (validarId.status_code == 200) {

                let validar = validarPapel(papel)

                if (!validar) {

                    let resultPapel = await papelDAO.setUpdatePositionById(id, papel)

                    if(resultPapel) {

                        let papelAtualizado = await buscarPapelId(id)

                        MESSAGES.DEFAULT_HEADER.status                          = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                     = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                         = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.updated_character_role    = papelAtualizado.items.character_role
                        
                        return MESSAGES.DEFAULT_HEADER // 200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                } else {
                    return validar // 400
                }

            } else {
                return validarId // (404 ou 500 ou 404)
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

const excluirPapel = async (id) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await buscarPapelId(id) 
    
        if (validarId.status_code == 200) {

            const result = await papelDAO.setDeletePositionById(id)

            if(result) {

                MESSAGES.DEFAULT_HEADER.status                          = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code                     = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message                         = MESSAGES.SUCCESS_DELETE.message
                MESSAGES.DEFAULT_HEADER.items.deleted_character_role    = validarId.items.character_role

                return MESSAGES.DEFAULT_HEADER

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            return validarId // (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

const validarPapel = (papel) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (papel.nome == "" || papel.nome == undefined || papel.nome == null || papel.nome.length > 50) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

module.exports = {
    listarPapeis,
    buscarPapelId,
    inserirPapel,
    atualizarPapel,
    excluirPapel
}