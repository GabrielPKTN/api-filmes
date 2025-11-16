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
        
        const result = await papelDAO.getSelectAllRole()

        if(result) {

            if (result.length > 0) {

                MESSAGES.DEFAULT_HEADER.status                  = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code             = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.roles             = result

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

            const result = await papelDAO.getSelectRoleById(id)

            if(result) {

                if(result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status               =  MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code          =  MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.role           =  result

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

                const result = await papelDAO.setInsertRole(papel)

                if (result) {

                    const lastId = await papelDAO.getSelectLastRole()

                    if(lastId) {

                        MESSAGES.DEFAULT_HEADER.status                      =   MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                 =   MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                     =   MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.role_created          =   lastId

                        return MESSAGES.DEFAULT_HEADER

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

                    const result = await papelDAO.setUpdateRoleById(id, papel)

                    if(result) {

                        MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message             = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        delete MESSAGES.DEFAULT_HEADER.items
                        
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

            const result = await papelDAO.setDeleteRoleById(id)

            if(result) {

                MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_DELETE.message
                delete MESSAGES.DEFAULT_HEADER.items

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