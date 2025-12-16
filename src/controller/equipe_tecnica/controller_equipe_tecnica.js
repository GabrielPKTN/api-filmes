/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD da equipe_tecnica.
 * Data: 23/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/


const equipeDAO = require("../../model/DAO/equipe-tecnica-dao/equipe_tecnica.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

// Retorna todos os profissionais registrados no sistema
const listarEquipes = async () => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        const resultEquipe = await equipeDAO.getSelectTeam()

        if(resultEquipe) {

            if (resultEquipe.length > 0) {

                MESSAGES.DEFAULT_HEADER.status                  = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code             = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.team              = resultEquipe

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
const buscarEquipeId = async (id) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (!isNaN(id) && id != "" && id != null && id != undefined && id > 0) {

            const resultEquipe = await equipeDAO.getSelectTeamById(id)

            if(resultEquipe) {

                if(resultEquipe.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status                      =  MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code                 =  MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.team                  =  resultEquipe

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
const inserirEquipe = async (equipe, contentType) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarEquipe(equipe)
            
            if (!validar) {

                resultEquipe = await equipeDAO.setInsertTeam(equipe)
                
                if (resultEquipe) {

                    equipeCriada = await equipeDAO.getSelectLastTeam()

                    if(equipeCriada) {

                        equipe = equipeCriada[0]

                        MESSAGES.DEFAULT_HEADER.status                                  =   MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                             =   MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                                 =   MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.team_created                      =   equipe

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
const atualizarEquipe = async (id, equipe, contentType) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == "APPLICATION/JSON") {

            let validarId = await buscarEquipeId(id)

            if (validarId.status_code == 200) {

                let validar = validarEquipe(equipe)

                if (!validar) {

                    const resultEquipe = await equipeDAO.setUpdateTeam(id, equipe)

                    if(resultEquipe) {

                        equipeAtualizada = await buscarEquipeId(id)

                        MESSAGES.DEFAULT_HEADER.status                              = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code                         = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message                             = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.team_updated                  = equipeAtualizada.items.team
                        

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
const excluirEquipe = async (id) => {

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

            result = await equipeDAO.setDeleteProfessionalById(id)

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
const validarEquipe = (equipe) => {

    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (isNaN(equipe.id_filme) || equipe.id_filme == "" || equipe.id_filme == undefined || equipe.id_filme == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID FILME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false

    }

}

module.exports = {

    listarEquipes,
    buscarEquipeId,
    inserirEquipe,
    atualizarEquipe,
    excluirEquipe

}