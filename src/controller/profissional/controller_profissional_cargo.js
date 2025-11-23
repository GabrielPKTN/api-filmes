/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD na relação entre profissional e cargo.
 * Data: 12/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const profissionalCargoDAO = require("../../model/DAO/profissional-dao/profissional_cargo.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const listarProfissionaisCargos = async () => {

    try {

        // Cópia do objeto DEFAULT_MESSAGES
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        let result = await profissionalCargoDAO.getSelectProfessionalsRoles()

        if (result) {
            if (result.length > 0) {

                MESSAGES.DEFAULT_HEADER.status                      = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code                 = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.professionals_roles   = result

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

const buscarProfissionalCargoId = async (id) => {


    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let result = await profissionalCargoDAO.getSelectProfessionalsRolesById(id)

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

const listarCargosProfissionalId = async (id_profissional) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id_profissional) && id_profissional != '' && id_profissional != null && id_profissional > 0) {

            let result = await profissionalCargoDAO.getSelectRolesByProfessionalId(id_profissional)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.role = result

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

const listarProfissionaisCargoId = async (id_cargo) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id_cargo) && id_cargo != '' && id_cargo != null && id_cargo > 0) {

            let result = await profissionalCargoDAO.getSelectProfessionalsByRoleId(id_cargo)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.professional = result

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

const inserirProfissionalCargo = async (profissionalCargo, contentType) => {
    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarDadosProfissionalCargo(profissionalCargo)
            
            if (!validar) {

                //Processamento
                //Chamando função para inserir o genero no BD
                let result = await profissionalCargoDAO.setInsertProfessionalRole(profissionalCargo)
                
                if (result) {

                    let profissionalCargoCriado = await profissionalCargoDAO.getSelectLastRoleProfessional()
                    
                    if (profissionalCargoCriado) {
                        
                        MESSAGES.DEFAULT_HEADER.status                              = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                         = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                             = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.professional_role_created     = profissionalCargoCriado
                        
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

const atualizarProfissionalCargo = async (id, profissionalCargo, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosProfissionalCargo(profissionalCargo)
            
            if (!validar) {

                let validarId = await buscarProfissionalCargoId(id)
                
                if (validarId.status_code == 200) {

                    //Processamento
                    //Chamando função para inserir o genero no BD
                    let result = await profissionalCargoDAO.setUpdateProfessionalRole(id, profissionalCargo)
                    
                    if (result) {

                        let profissionalCargoAtualizado = await buscarProfissionalCargoId(id)

                        MESSAGES.DEFAULT_HEADER.status                           = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                      = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                          = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.professional_role_updated  = profissionalCargoAtualizado.items.distributor

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

const excluirProfissionalCargo = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let validarId = await buscarProfissionalCargoId(id)

        if (validarId.status_code == 200) {

            let result = await profissionalCargoDAO.setDeleteProfessionalRoleById(id) 
            

            if (result) {

                MESSAGES.DEFAULT_HEADER.status                          = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code                     = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message                         = MESSAGES.SUCCESS_DELETE.message
                MESSAGES.DEFAULT_HEADER.items.professional_role_deleted = validarId.items.professional

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

const validarDadosProfissionalCargo = (profissionalCargo) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (profissionalCargo.id_profissional < 0 || isNaN(profissionalCargo.id_profissional) || profissionalCargo.id_profissional == "" || profissionalCargo.id_profissional == undefined || profissionalCargo.id_profissional == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID_PROFISSIONAL INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(profissionalCargo.id_cargo < 0 || isNaN(profissionalCargo.id_cargo) || profissionalCargo.id_cargo == "" || profissionalCargo.id_cargo == undefined || profissionalCargo.id_cargo == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID_CARGO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false

    }

}

module.exports = {

    listarProfissionaisCargos,
    buscarProfissionalCargoId,
    listarCargosProfissionalId,
    listarProfissionaisCargoId,
    inserirProfissionalCargo,
    atualizarProfissionalCargo,
    excluirProfissionalCargo

}