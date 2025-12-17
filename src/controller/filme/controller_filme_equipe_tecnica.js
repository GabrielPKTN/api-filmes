/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD na relação entre filme e equipe tecnica.
 * Data: 16/12/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const filmeEquipeDAO = require("../../model/DAO/filme-dao/filme_equipe_tecnica.js") 
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const buscarEquipeFilmeId = async (filmeId) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (!isNaN(filmeId) && filmeId != '' && filmeId != null && filmeId > 0) {
        
            let result = await filmeEquipeDAO.getSelectTeamByMovieId(filmeId)

            if (result) {
                if (result.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.team          = result

                    return MESSAGES.DEFAULT_HEADER //200

                } else {

                    return MESSAGES.ERROR_NOT_FOUND //404

                }

            } else {

                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

module.exports = {

    buscarEquipeFilmeId

}