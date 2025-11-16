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
    
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let resultDistribuidora = await distribuidoraDAO.getSelectAllDistributor()

        if (resultDistribuidora) {

            if(resultDistribuidora.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.distributors = resultDistribuidora

                return MESSAGES.DEFAULT_HEADER // 201

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

            let resultDistribuidora = await distribuidoraDAO.getSelectDistributorById(id)

            if (resultDistribuidora) {

                if (resultDistribuidora.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.distributor = resultDistribuidora
                    
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

const inserirDistribuidora = async (distribuidora, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

        let validar = validarDadosDistribuidora(distribuidora)

            if (!validar) {

                let resultDistribuidora = await distribuidoraDAO.setInsertDistributor(distribuidora)

                if (resultDistribuidora) {

                    let distribuidoraCriada = await distribuidoraDAO.getSelectLastDistributor()

                    if (distribuidoraCriada) {

                        MESSAGES.DEFAULT_HEADER.status                          = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                     = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                         = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.distributor_created       = distribuidoraCriada

                        return MESSAGES.DEFAULT_HEADER // 201

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

                    let resultDistribuidora = await distribuidoraDAO.setUpdateDistributorById(id, distribuidora) 

                    if (resultDistribuidora) {

                        let distribuidoraAtualizada = await buscarDistribuidoraId(id)

                        MESSAGES.DEFAULT_HEADER.status                          = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                     = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                         = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.distributor_updated       = distribuidoraAtualizada.items.distributor
                        
                        return MESSAGES.DEFAULT_HEADER // 200

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
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

const excluirDistribuidora = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let validarId = await buscarDistribuidoraId(id)

        if (validarId.status_code == 200) {

            let resultDistribuidora = await distribuidoraDAO.setDeleteDistributor(id)

            if (resultDistribuidora) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE.message
                MESSAGES.DEFAULT_HEADER.items.deleted_distributor = validarId.items.distributor

                return MESSAGES.DEFAULT_HEADER // 200

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            return validarId // (400, 404, 500)
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

const validarDadosDistribuidora = (distribuidora) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    if (distribuidora.nome == "" || distribuidora.nome == undefined || distribuidora.nome == null || distribuidora.nome.length > 50) {
    
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