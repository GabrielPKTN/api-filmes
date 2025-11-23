/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD de profissional.
 * Data: 22/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/


const profissionalDAO = require("../../model/DAO/profissional-dao/profissional.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const controllerProfissionalCargo = require("./controller_profissional_cargo.js")

// Retorna todos os profissionais registrados no sistema
const listarProfissionais = async () => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        const resultProfissional = await profissionalDAO.getSelectAllProfessional()

        if(resultProfissional) {

            if (resultProfissional.length > 0) {

                for (profissional of resultProfissional) {

                    profissionalCargo = await controllerProfissionalCargo.listarCargosProfissionalId(profissional.id)

                    if (profissionalCargo.status_code == 200) {

                        profissional.cargo = profissionalCargo.items.role

                    }

                }

                MESSAGES.DEFAULT_HEADER.status                  = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code             = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.professional      = resultProfissional

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

// Retorna um profissional registrado no sistema
const buscarProfissionalId = async (id) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (!isNaN(id) && id != "" && id != null && id != undefined && id > 0) {

            const resultProfissional = await profissionalDAO.getSelectProfessionalById(id)

            if(resultProfissional) {

                if(resultProfissional.length > 0) {

                    for (profissional of resultProfissional) {

                        profissionalCargo = await controllerProfissionalCargo.listarCargosProfissionalId(profissional.id)

                        if (profissionalCargo.status_code == 200) {

                            profissional.cargo = profissionalCargo.items.role
                            
                        }

                    }

                    MESSAGES.DEFAULT_HEADER.status                      =  MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code                 =  MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.professional          =  resultProfissional

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

// Registra um profissional no sistema
const inserirProfissional = async (profissional, contentType) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarProfissional(profissional)

            if (!validar) {

                const resultEstudio = await profissionalDAO.setInsertProfessional(profissional)

                if (resultEstudio) {

                    const profissionalCriado = await profissionalDAO.getSelectLastProfessional()

                    if(profissionalCriado) {

                        for (let cargo of profissional.cargo) {

                            profissionalCargo = {id_profissional:profissionalCriado[0].id , id_cargo: cargo.id}

                            resultInsertProfissionalCargo = await controllerProfissionalCargo
                                                                    .inserirProfissionalCargo(profissionalCargo, contentType)

                            if(resultInsertProfissionalCargo.status_code != 201) {
                                MESSAGES.ERROR_RELATINAL_INSERTION += ' [PROFISSIONAL CARGO]'
                                return MESSAGES.ERROR_RELATINAL_INSERTION
                            }

                        }

                        profissional = profissionalCriado[0]

                        delete profissional.cargo

                        resultProfissionalCargo = await controllerProfissionalCargo.listarCargosProfissionalId(profissional.id)

                        profissional.cargo = resultProfissionalCargo.items.role

                        MESSAGES.DEFAULT_HEADER.status                                  =   MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                             =   MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                                 =   MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.professional_created              =   profissional

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

// Atualiza dados de um profissional no sistema
const atualizarProfissional = async (id, profissional, contentType) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == "APPLICATION/JSON") {

            let validarId = await buscarProfissionalId(id)

            if (validarId.status_code == 200) {

                let validar = validarProfissional(profissional)

                if (!validar) {

                    const resultProfissional = await profissionalDAO.setUpdateProfessionalById(id, profissional)

                    if(resultProfissional) {

                        let profissionalAtualizado = await buscarProfissionalId(id)

                        //Pega todas as relações entre profissional e cargo
                        profissionaisCargos = await controllerProfissionalCargo.listarProfissionaisCargos()

                        //Pega somente os arrays onde tem os itens
                        listaProfissionalCargo = profissionaisCargos.items.professionals_roles

                        //Para cada relação dentro desse array...
                        for (let profissionalCargo of listaProfissionalCargo) {

                            //Caso a relação tenha o atributo id_profissional igual
                            //ao id que está sendo atualizado...
                            if (profissionalCargo.id_profissional == id) {

                                relacaoProfissionalCargo = profissionalCargo.id

                                deleteRelacao = await controllerProfissionalCargo.excluirProfissionalCargo(relacaoProfissionalCargo)

                                if(deleteRelacao.status_code != 200) {
                                    MESSAGES.ERROR_RELATINAL_INSERTION.message += " [PROFISSIONAL CARGO]" 
                                    return MESSAGES.ERROR_RELATINAL_INSERTION // 500 Problema na tabela de relação
                                }

                            }

                        }

                        for (let cargo of profissional.cargo) {

                            profissionalCargo = {id_profissional:Number(id) , id_cargo: cargo.id}

                            resultInsertProfissionalCargo = await controllerProfissionalCargo
                                                                    .inserirProfissionalCargo(profissionalCargo, contentType)

                            if(resultInsertProfissionalCargo.status_code != 201) {
                                MESSAGES.ERROR_RELATINAL_INSERTION += ' [PROFISSIONAL CARGO]'
                                return MESSAGES.ERROR_RELATINAL_INSERTION
                            }

                        }

                        profissional = profissionalAtualizado.items.professional

                        delete profissional[0].cargo
                        

                        resultProfissionalCargo = await controllerProfissionalCargo.listarCargosProfissionalId(profissional[0].id)

                        profissional[0].cargo = resultProfissionalCargo.items

                        MESSAGES.DEFAULT_HEADER.status                              = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                         = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                             = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.professional_updated          = profissional
                        

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

// Exclui um profissional no sistema
const excluirProfissional = async (id) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await buscarProfissionalId(id) 
    
        if (validarId.status_code == 200) {

            relacoesProfissionalCargo = await controllerProfissionalCargo.listarProfissionaisCargos() 
            
            listaRelacoesProfissionalCargo = relacoesProfissionalCargo.items.professionals_roles

            for (let relacao of listaRelacoesProfissionalCargo) {

                if (relacao.id_profissional == id) {

                    idRelacao = relacao.id

                    resultDeleteProfissionalCargo = await controllerProfissionalCargo.excluirProfissionalCargo(idRelacao)

                    if(resultDeleteProfissionalCargo.status_code != 200) {
                        MESSAGES.ERROR_RELATINAL_INSERTION.message += " [PROFISSIONAL CARGO]" 
                        return MESSAGES.ERROR_RELATINAL_INSERTION // 500 Problema na tabela de relação
                    }

                }

            }

            result = await profissionalDAO.setDeleteProfessionalById(id)

            if(result) {

                MESSAGES.DEFAULT_HEADER.status                              = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code                         = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message                             = MESSAGES.SUCCESS_DELETE.message
                MESSAGES.DEFAULT_HEADER.items.deleted_professional          = validarId.items.professional

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

// Valida dados vindos da requisição
const validarProfissional = (profissional) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (!isNaN(profissional.nome) || profissional.nome == "" || profissional.nome == undefined || profissional.nome == null || profissional.nome.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (profissional.data_nascimento.length > 10  || profissional.data_nascimento == undefined) {
        
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [DATA INCORRETA]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (profissional.biografia == undefined) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [BIOGRAFIA INCORRETA]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (profissional.foto == undefined || profissional.foto.length > 255) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [FOTO INCORRETA]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false

    }

}

module.exports = {
    listarProfissionais,
    buscarProfissionalId,
    inserirProfissional,
    atualizarProfissional,
    excluirProfissional
}