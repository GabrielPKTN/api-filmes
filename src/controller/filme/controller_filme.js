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

            let validar = await validarDadosFilme(filme)

            if (!validar) {

                //Processamento
                //Chama a função para inserir um novo filme no BD
                let resultFilme = await filmeDAO.setInsertFilms(filme)

                if (resultFilme) {
                    //Chama a função para receber o id gerado no banco de dados
                    let lastId = await filmeDAO.getSelectLastId()
                    
                    if (lastId) {

                        //Adiciona o id no json com os dados do filme
                        filme.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = filme

                        return MESSAGES.DEFAULT_HEADER //201

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }       

                } else {

                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500

                }

            } else {
                return validar
            }

        } else {
                return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500

    }

}

//Atuualiza um filme pelo ID
const atualizarFilme = async (filme, id, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilme(filme)

            if (!validar) {

                let validarId = await buscarFilmeId(id)

                if(validarId.status_code == 200) {

                    filme.id = Number(id)

                    let resultFilme = await filmeDAO.setUpdateFilms(filme)

                    if (resultFilme) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = filme

                        return MESSAGES.DEFAULT_HEADER //200

                    } else {

                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500

                    }

                } else {

                    return validarId // A função podera retornar (400 ou 404 ou 500)
                }

            } else {

                return validar // Referente a validação de dados
            }

        } else {
                return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Exclui um filme pelo ID
const excluirFilme = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let validarId = await buscarFilmeId(id)
        
        if (validarId.status_code == 200) {
            
            deletarFilme = await filmeDAO.setDeleteFilms(id);
            MESSAGES.DEFAULT_HEADER.status      =   MESSAGES.SUCCESS_DELETE.status
            MESSAGES.DEFAULT_HEADER.status_code =   MESSAGES.SUCCESS_DELETE.status_code
            MESSAGES.DEFAULT_HEADER.message     =   MESSAGES.SUCCESS_DELETE.message
            delete MESSAGES.DEFAULT_HEADER.items

            return MESSAGES.DEFAULT_HEADER

        } else {
            validarId
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDadosFilme = async function (filme) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    //Validações de todas as entradas de dados
    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.sinopse == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Sinopse Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data lançamento Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.duracao == undefined || filme.duracao == null || filme.duracao == '' || filme.duracao.length > 8){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Duração Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.orcamento == undefined || filme.orcamento == null || filme.orcamento == '' || filme.orcamento.length > 12 || typeof(filme.orcamento) != 'number'){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Orçamento Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.trailer == undefined || filme.trailer.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Trailer Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.capa == undefined || filme.capa == null || filme.capa == '' || filme.capa.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Capa Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false //não teve erros
    }
}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}