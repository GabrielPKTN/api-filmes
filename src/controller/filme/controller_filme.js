/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD de filmes.
 * Data: 07/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const filmeDAO = require("../../model/dao/filme.js")
const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

const listarFilmes = async () => {
    try {

        // Cópia do objeto DEFAULT_MESSAGES
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        //Chama a função de DAO para retornar a listas de filmes
        let resultFilmes = await filmeDAO.getSelectAllFilms()

        if (resultFilmes) {
            if (resultFilmes.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes


                return MESSAGES.DEFAULT_HEADER //200
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

const buscarFilmeId = async (id) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do id
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultFilme = await filmeDAO.getSelectByIdFilms(Number(id))

            if (resultFilme) {
                if (resultFilme.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilme

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

// Insere um filme
const inserirFilme = async (filme, contentType) => {

    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação dos dados

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.sinopse == undefined) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Sinopse incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.data_lancamento == undefined && filme.data_lancamento.length != 10) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de lançamento incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Duração incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 12 || typeof (filme.orcamento) != 'number') {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Orçamento incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.trailer == undefined && filme.trailer.length > 200) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Trailer incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Capa incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else {

                //Processamento
                //Chama a função para inserir um novo filme no BD
                let resultFilme = await filmeDAO.setInsertFilms(filme)

                if (resultFilme) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                    return MESSAGES.DEFAULT_HEADER //201

                } else {

                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500

                }

            }

        } else {
                return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500

    }

}

//Atuualiza um filme pelo ID
const atualizarFilme = async (filme, id) => {

}

//Exclui um filme pelo ID
const excluirFilme = async (id) => {

}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme
}