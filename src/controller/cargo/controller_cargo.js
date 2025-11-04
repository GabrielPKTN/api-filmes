/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD de filmes.
 * Data: 28/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const cargoDAO = require("../../model/DAO/cargo.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const listarCargos = async () => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        const result = await cargoDAO.getSelectAllResponsability()


        if(result) {

            if (result.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.responsabilitys = result

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

const buscarCargoId = async (id) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (!isNaN(id) && id != "" && id != null && id != undefined && id > 0) {

            const result = await cargoDAO.getSelectResponsabilityById(id)

            if(result) {

                if(result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status               =  MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code          =  MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.responsability =  result

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

const inserirCargo = async (cargo, contentType) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarCargo(cargo)

            if (!validar) {

                const result = await cargoDAO.setInsertResponsability(cargo)

                if (result) {

                    const lastId = await cargoDAO.getSelectLastResponsability()

                    if(lastId) {

                        MESSAGES.DEFAULT_HEADER.status                          =   MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                     =   MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                         =   MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.responsability_created    =   lastId

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

const atualizarCargo = async (id, cargo, contentType) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == "APPLICATION/JSON") {

            let validarId = await buscarCargoId(id)

            if (validarId.status_code == 200) {

                let validar = validarCargo(cargo)

                if (!validar) {

                    const result = cargoDAO.setUpdateResponsabilityById(id, cargo)

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

const excluirCargo = async (id) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await buscarCargoId(id) 
    
        if (validarId.status_code == 200) {

            const result = await cargoDAO.setDeleteResponsabilityById(id)

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
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

const validarCargo = (cargo) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (cargo.nome == "" || cargo.nome == undefined || cargo.nome == null || cargo.nome.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

module.exports = {
    listarCargos,
    buscarCargoId,
    inserirCargo,
    atualizarCargo,
    excluirCargo
}