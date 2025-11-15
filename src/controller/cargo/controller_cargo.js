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
        
        const resultCargos = await cargoDAO.getSelectAllRole()


        if(resultCargos) {

            if (resultCargos.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.roles = resultCargos

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

            const result = await cargoDAO.getSelectRoleById(id)

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

const inserirCargo = async (cargo, contentType) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarCargo(cargo)

            if (!validar) {

                const resultCargos = await cargoDAO.setInsertRole(cargo)

                if (resultCargos) {

                    const lastId = await cargoDAO.getSelectLastRole()

                    if(lastId) {

                        MESSAGES.DEFAULT_HEADER.status                          =   MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                     =   MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                         =   MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.role_created              =   lastId

                        return MESSAGES.DEFAULT_HEADER //201

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

                    const resultCargo = await cargoDAO.setUpdateRoleById(id, cargo)

                    if(resultCargo) {

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

            const resultCargo = await cargoDAO.setDeleteRoleById(id)

            if(resultCargo) {

                MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_DELETE.message
                delete MESSAGES.DEFAULT_HEADER.items

                return MESSAGES.DEFAULT_HEADER // 201

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