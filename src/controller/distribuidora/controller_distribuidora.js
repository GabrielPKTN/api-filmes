/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD de filmes.
 * Data: 28/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const distribuidoraDAO = require("../../model/DAO/distribuidora.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const listarDistribuidora = async () => {
    
    try {
        
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        let result = await distribuidoraDAO.getSelectAllDistributor()

        if (result) {
            if(result.length > 0) {

                MESSAGES.DEFAULT_MESSAGES.status = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_MESSAGES.status_code = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_MESSAGES.items.distributors = result

                return MESSAGES.DEFAULT_MESSAGES

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

const buscarDistribuidoraId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let result = distribuidoraDAO.getSelectDistributorById(id)

            if (result) {

                if (result.length > 0) {

                    MESSAGES.DEFAULT_MESSAGES.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_MESSAGES.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_MESSAGES.items.distributor = result
                    
                    return MESSAGES.DEFAULT_MESSAGES // 200

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

const inserirDistribuidora = async (distribuidora, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

        let validar = validarDadosDistribuidora(distribuidora)

            if (!validar) {

                let result = await distribuidoraDAO.setInsertDistributor(distribuidora)

                if (result) {

                    let lastId = await distribuidoraDAO.getSelectLastDistributor()

                    if (lastId) {

                        MESSAGES.DEFAULT_MESSAGES.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_MESSAGES.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_MESSAGES.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_MESSAGES.items = lastId.id + distribuidora

                        return MESSAGES.DEFAULT_MESSAGES // 201

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

const atualizarDistribuidora = async (id, distribuidora, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarId = await buscarDistribuidoraId(id)

            if (validarId.status_code == 200) {

                let validar = validarDadosDistribuidora(distribuidora)

                if (!validar) {

                    let result = await distribuidoraDAO.setUpdateDistributorById(id, distribuidora) 

                    if (result) {

                        MESSAGES.DEFAULT_MESSAGES.status = MESSAGES.SUCCESS_UPDATED.status
                        MESSAGES.DEFAULT_MESSAGES.status_code = MESSAGES.SUCCESS_UPDATED.status_code
                        MESSAGES.DEFAULT_MESSAGES.message = MESSAGES.SUCCESS_UPDATED.message
                        MESSAGES.DEFAULT_MESSAGES.items.distributor = id + distribuidora
                        
                        return MESSAGES.DEFAULT_MESSAGES // 200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                } else {
                    return validar // 400
                }

            } else {
                return validarId // (400, 404, 500)
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
    }

}

const excluirDistribuidora = async (id) => {

    try {
        
        let validarId = buscarDistribuidoraId(id)

        if (validarId.status_code == 200) {

            let result = await distribuidoraDAO.setDeleteDistributor(id)

            if (result) {

                MESSAGES.DEFAULT_MESSAGES.status = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_MESSAGES.status_code = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_MESSAGES.message = MESSAGES.SUCCESS_DELETE.message
                MESSAGES.DEFAULT_MESSAGES.items.deleted_distributor = validarId.items.distributor

                return MESSAGES.DEFAULT_MESSAGES // 200

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            return validarId // (400, 404, 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

const validarDadosDistribuidora = (distribuidora) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    if (distribuidora.nome == "" || distribuidora.nome == undefined || distribuidora.nome == null || distribuidora.nome.length > 100) {
    
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    
    } else {
    
        return false
    
    }

}

module.exports = {
    listarDistribuidora,
    buscarDistribuidoraId,
    inserirDistribuidora,
    atualizarDistribuidora,
    excluirDistribuidora
}