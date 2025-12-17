/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD de filmes.
 * Data: 07/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0 (CRUD básico do filme, sem as relações com outras tabelas)
 * Versão: 1.1.0 (CRUD do filme com relacionamento com a tabela genero)
 *********************************************************************/

const filmeDAO = require("../../model/DAO/filme-dao/filme.js")

// Import da controller da relação entre filme e gênero
const filmeGeneroController = require("./controller_filme_genero.js")

// Import da controller da relação entre filme e distribuidora
const filmeDistribuidoraController = require("./controller_filme_distribuidora.js")

// Import da controller da relação entre filme e estudio
const filmeEstudioController = require("./controller_filme_estudio.js")

//Import das controllers que envolvem a equipe técnica do filme
const equipeTecnicaController = require("../equipe_tecnica/controller_equipe_tecnica.js")
const filmeEquipeController   = require("./controller_filme_equipe_tecnica.js")

//Import da controller de profissionais
const profissionalController       = require("../profissional/controller_profissional.js")
const profissionalEquipeController = require("../profissional/controller_profissional_equipe.js")

const DEFAULT_MESSAGES = require("../modulo/config_messages.js")

// Lista os todos os filmes
const listarFilmes = async () => {
    
    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Chama a função de DAO para retornar a listas de filmes
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if (resultFilmes) {
            if (resultFilmes.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                
                for (let filme of resultFilmes) {
                    
                    idFilme = filme.id

                    let resultFilmeGenero = await filmeGeneroController.listarGenerosFilmeId(filme.id)

                    if (resultFilmeGenero.status_code == 200) {
                        filme.genero = resultFilmeGenero.items.movie_genres
                    }

                    let resultFilmeDistribuidora = await filmeDistribuidoraController.listarDistribuidorasFilmeId(filme.id)
                    if (resultFilmeDistribuidora.status_code == 200) {
                        filme.distribuidora = resultFilmeDistribuidora.items.distributors
                    }

                    resultFilmeEstudio = await filmeEstudioController.listarEstudiosFilmeId(filme.id)
                    
                    if (resultFilmeEstudio.status_code == 200) {
                        filme.estudio = resultFilmeEstudio.items.movie_studio
                    }

                    resultEquipe = await filmeEquipeController.buscarEquipeFilmeId(idFilme)
                    if(resultEquipe.status_code == 200) {
                        
                        equipeId = resultEquipe.items.team[0].id

                        equipe = await equipeTecnicaController.buscarEquipeId(equipeId)

                        profissionalArray = equipe.items.team[0].profissionais

                        profissionais = []

                        if (profissionalArray != undefined) {

                            for (profissional of profissionalArray) {

                                idProfissional = profissional.id

                                resultProfissional = await profissionalController.buscarProfissionalId(idProfissional)
                                
                                profissionalObject = resultProfissional.items.professional[0]

                                profissionais.push(profissionalObject)

                            }

                        }

                        delete equipe.items.team[0].profissionais

                        equipe.items.team[0].profissionais = profissionais

                        filme.equipe_tecnica = equipe.items.team

                    }

                }
                
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

// Busca um filme pelo id
const buscarFilmeId = async (id) => {
    // Cópia do objeto DEFAULT_MESSAGES
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação da chegada do id
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultFilme = await filmeDAO.getSelectByIdMovies(Number(id))
            
            if (resultFilme) {
                if (resultFilme.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                
                    for (let filme of resultFilme) {

                        id_filme = filme.id

                        resultFilmeGenero = await filmeGeneroController.listarGenerosFilmeId(id_filme)

                        if (resultFilmeGenero.status_code == 200) {
                            
                            filme.genero = resultFilmeGenero.items.movie_genres
                            
                        }

                        resultFilmeDistribuidora = await filmeDistribuidoraController.listarDistribuidorasFilmeId(id_filme)

                        if (resultFilmeDistribuidora.status_code == 200) {

                            filme.distribuidora = resultFilmeDistribuidora.items.distributors

                        }

                        resultFilmeEstudio = await filmeEstudioController.listarEstudiosFilmeId(id_filme)

                        if (resultFilmeEstudio.status_code == 200) {

                            filme.estudio = resultFilmeEstudio.items.movie_studio

                        }

                        resultEquipe = await filmeEquipeController.buscarEquipeFilmeId(id_filme)

                        if(resultEquipe.status_code == 200) {
                        
                            equipeId = resultEquipe.items.team[0].id

                            equipe = await equipeTecnicaController.buscarEquipeId(equipeId)

                            profissionalArray = equipe.items.team[0].profissionais

                            profissionais = []

                            if (profissionalArray != undefined) {

                                for (profissional of profissionalArray) {

                                    idProfissional = profissional.id

                                    resultProfissional = await profissionalController.buscarProfissionalId(idProfissional)
                                    
                                    profissionalObject = resultProfissional.items.professional[0]

                                    profissionais.push(profissionalObject)

                                }

                            }

                            delete equipe.items.team[0].profissionais

                            equipe.items.team[0].profissionais = profissionais

                            filme.equipe_tecnica = equipe.items.team

                        }

                    }

                    MESSAGES.DEFAULT_HEADER.items.movie = resultFilme
                    

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
                let resultFilme = await filmeDAO.setInsertMovies(filme)

                if (resultFilme) {

                    //Chama a função para receber o id gerado no banco de dados
                    let filmeCriado = await filmeDAO.getSelectLastMovies()

                    if (filmeCriado) {

                        //Processar a inserção dos dados na tabela de relação 
                        //entre filme e gênero

                        for (let genero of filme.genero) {
                            // Cria o json com o id do filme, e o id do genero.
                            let filmeGenero = {id_filme: filmeCriado[0].id, id_genero: genero.id}
                            
                            //Encaminha JSON com o id do filme, e o id do genero para a controller filme_genero.
                            let resultFilmesGenero = await filmeGeneroController.inserirFilmeGenero(filmeGenero, contentType)
                            
                            if(resultFilmesGenero.status_code != 201) {
                                MESSAGES.ERROR_RELATINAL_INSERTION.message += " [FILME E GÊNERO]"
                                return MESSAGES.ERROR_RELATINAL_INSERTION // 500 Problema na tabela de relação
                            }
                        }

                        //Processar a inserção dos dados na tabela de relação 
                        //entre filme e distribuidora

                        for (let distribuidora of filme.distribuidora) {

                            // Cria o json com o id do filme, e o id da distribuidora.
                            let filmeDistribuidora = { id_filme: filmeCriado[0].id, id_distribuidora: distribuidora.id }

                            // Encaminha JSON com o id do filme, e o id da distribuidora.
                            let resultFilmeDistribuidora = await filmeDistribuidoraController.inserirFilmeDistribuidora(filmeDistribuidora, contentType)
                            
                            if(resultFilmeDistribuidora.status_code != 201) {
                                MESSAGES.ERROR_RELATINAL_INSERTION.message += " [FILME E DISTRIBUIDORA]"
                                return MESSAGES.ERROR_RELATINAL_INSERTION // 500 Problema na tabela de relação
                            }

                        }

                        for (let estudio of filme.estudio) {

                            // Cria o json com o id do filme, e o id da distribuidora.
                            let filmeEstudio = { id_filme: filmeCriado[0].id, id_estudio: estudio.id }

                            // Encaminha JSON com o id do filme, e o id da distribuidora.
                            let resultFilmeEstudio = await filmeEstudioController.insereFilmeEstudio(filmeEstudio, contentType)

                            if(resultFilmeEstudio.status_code != 201) {
                                MESSAGES.ERROR_RELATINAL_INSERTION.message += " [FILME E ESTUDIO]"
                                return MESSAGES.ERROR_RELATINAL_INSERTION // 500 Problema na tabela de relação
                            }

                        }

                        profissionais = []

                        for (let profissional of filme.profissionais) {

                            let resultProfissional = await profissionalController.inserirProfissional(profissional, contentType)
                            
                            idProfissionalCriado = resultProfissional.items.professional_created.id

                            profissionais.push({id_profissional: idProfissionalCriado})

                        }

                        equipeObject = {
                            id_filme: filmeCriado[0].id,
                            profissionais: profissionais            
                        }

                        resultEquipe = await equipeTecnicaController.inserirEquipe(equipeObject, contentType)

                        filmeAtualizado = await buscarFilmeId(filmeCriado[0].id)
                        filme = filmeAtualizado.items.movie

                        //Adiciona o id no json com os dados do filme

                        MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_CREATED_ITEM.message

                        MESSAGES.DEFAULT_HEADER.items.created_movie = filme

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

// Atuualiza um filme pelo ID
const atualizarFilme = async (filme, id, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilme(filme)

            if (!validar) {

                let validarId = await buscarFilmeId(id)

                if(validarId.status_code == 200) {

                    let resultFilme = await filmeDAO.setUpdateMovies(id, filme)

                    if (resultFilme) {

                        /****PARTE RESPONSAVEL POR ATUALIZAR OS ATRIBUTOS RELACIONAMENTOS****/

                        //Pega todas relações entre filme e genero
                        let filmesGeneros = await filmeGeneroController.listarFilmesGeneros()
                        
                        //Pega somente o array onde contem os registros
                        let listaFilmesGeneros = filmesGeneros.items.movies_genres

                        //Para cada relação dentro do array de relações...
                        for (let filmeGenero of listaFilmesGeneros) {

                            // Caso a relação contenha o mesmo id do filme que 
                            // está sendo atualizado...
                            if (filmeGenero.id_filme == id) {

                                // Coleta o id da relação...
                                let idFilmeGenero = filmeGenero.id
                                
                                // E deleta.
                                let resultDeleteFilmeGenero = await filmeGeneroController.excluirFilmeGenero(idFilmeGenero)

                                if(resultDeleteFilmeGenero.status_code != 200) {
                                    MESSAGES.ERROR_RELATINAL_INSERTION.message += " [FILME E GÊNERO]" 
                                    return MESSAGES.ERROR_RELATINAL_INSERTION // 500 Problema na tabela de relação
                                }
                            }

                        }

                        // Em seguida, se realiza o mesmo processo do insert...
                        for (let genero of filme.genero) {
                            
                            let filmeGenero = {id_filme: Number(id), id_genero: genero.id}

                            let resultFilmesGenero = await filmeGeneroController.inserirFilmeGenero(filmeGenero, contentType)
                            
                            if(resultFilmesGenero.status_code != 201) {
                                return MESSAGES.ERROR_RELATINAL_INSERTION // 500 Problema na tabela de relação
                            }

                        }

                        //Pega todas relações entre filme e distribuidora
                        let filmesDistribuidoras = await filmeDistribuidoraController.listarFilmesDistribuidoras()

                        //Pega somente o array onde contem os registros
                        let listaFilmesDistribuidoras = filmesDistribuidoras.items.movie_distributor

                        //Para cada relação dentro do array de relações...
                        for (let filmeDistribuidora of listaFilmesDistribuidoras) {
                            // Caso a relação contenha o mesmo id do filme que 
                            // está sendo atualizado...
                            if (filmeDistribuidora.id_filme == id) {

                                // Coleta o id da relação...
                                let idFilmeDistribuidora = filmeDistribuidora.id
                                
                                // E deleta.
                                let resultDeleteFilmeDistribuidora = await filmeDistribuidoraController.excluirFilmeDistribuidora(idFilmeDistribuidora)

                                if(resultDeleteFilmeDistribuidora.status_code != 200) {
                                    MESSAGES.ERROR_RELATINAL_INSERTION.message += " [FILME E DISTRIBUIDORA]"
                                    return MESSAGES.ERROR_RELATINAL_INSERTION // 500 Problema na tabela de relação
                                }
                            }
                        }

                        // Em seguida, se realiza o mesmo processo do insert...
                        for (let distribuidora of filme.distribuidora) {

                            // Cria o json com o id do filme, e o id da distribuidora.
                            let filmeDistribuidora = { id_filme: Number(id), id_distribuidora: distribuidora.id }

                            // Encaminha JSON com o id do filme, e o id da distribuidora.
                            let resultFilmeDistribuidora = await filmeDistribuidoraController.inserirFilmeDistribuidora(filmeDistribuidora, contentType)
                            if(resultFilmeDistribuidora.status_code != 201) {
                                MESSAGES.ERROR_RELATINAL_INSERTION.message += " [FILME E DISTRIBUIDORA]"
                                return MESSAGES.ERROR_RELATINAL_INSERTION // 500 Problema na tabela de relação
                            }

                        }

                        //Pega todas relações entre filme e distribuidora
                        let filmesEstudios = await filmeEstudioController.listarFilmesEstudios()

                        //Pega somente o array onde contem os registros
                        let listarFilmesEstudios = filmesEstudios.items.movie_studio

                        //Para cada relação dentro do array de relações...
                        for (let filmeEstudio of listarFilmesEstudios) {
                            // Caso a relação contenha o mesmo id do filme que 
                            // está sendo atualizado...
                            if (filmeEstudio.id_filme == id) {

                                // Coleta o id da relação...
                                let idFilmeEstudio = filmeEstudio.id
                                
                                // E deleta.
                                let resultDeleteFilmeEstudio = await filmeEstudioController.deleteFilmeEstudio(idFilmeEstudio)

                                if(resultDeleteFilmeEstudio.status_code != 200) {
                                    MESSAGES.ERROR_RELATINAL_INSERTION.message += " [FILME E ESTUDIO]"
                                    return MESSAGES.ERROR_RELATINAL_INSERTION // 500 Problema na tabela de relação
                                }
                            }
                        }

                        // Em seguida, se realiza o mesmo processo do insert...
                        for (let estudio of filme.estudio) {

                            // Cria o json com o id do filme, e o id da distribuidora.
                            let filmeEstudio = { id_filme: Number(id), id_estudio: estudio.id }

                            // Encaminha JSON com o id do filme, e o id da distribuidora.
                            let resultFilmeEstudio = await filmeEstudioController.insereFilmeEstudio(filmeEstudio, contentType)
                            

                            if(resultFilmeEstudio.status_code != 201) {
                                MESSAGES.ERROR_RELATINAL_INSERTION.message += " [FILME E DISTRIBUIDORA]"
                                return MESSAGES.ERROR_RELATINAL_INSERTION // 500 Problema na tabela de relação
                            }

                        }

                        //Busca a equipe do filme
                        equipe = await filmeEquipeController.buscarEquipeFilmeId(id)

                        //Busca a equipe tecnica do filme
                        for (object of equipe.items.team) {
                            
                            //Extrai o id da equipe
                            idEquipe = object.id
                            
                            //Busca todos os registros que contem o id dessa equipe
                            relacoesEquipesProfissionais = await profissionalEquipeController.listarRelacoesEquipeId(idEquipe)

                            //Extrai o array de relacao dessa equipe
                            relacoes = relacoesEquipesProfissionais.items.relations

                            for (relacao of relacoes) {

                                idRelacao = relacao.id

                                //Deleta cada registro com o id de equipe desse filme
                                resultDelete = await profissionalEquipeController.excluirProfissionalEquipe(idRelacao)

                                if(resultDelete.status_code != 200) {
                                    return resultDelete
                                }

                            }
                            
                            //Deleta a equipe
                            deleteEquipe = await equipeTecnicaController.excluirEquipe(idEquipe)
                            
                            if(deleteEquipe.status_code != 200) {
                                return deleteEquipe
                            }

                        }

                        profissionais = []

                        for (let profissional of filme.profissionais) {

                            let resultProfissional = await profissionalController.inserirProfissional(profissional, contentType)
                            
                            idProfissionalCriado = resultProfissional.items.professional_created.id

                            profissionais.push({id_profissional: idProfissionalCriado})
                            
                        }


                        equipeObject = {
                            id_filme: Number(id),
                            profissionais: profissionais            
                        }

                        resultEquipe = await equipeTecnicaController.inserirEquipe(equipeObject, contentType)
                        
                        filmeAtualizado = await buscarFilmeId(id)
                        filme = filmeAtualizado.items.movie

                        MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message             = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.updated_movie = filme

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

// Exclui um filme pelo ID
const excluirFilme = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let validarId = await buscarFilmeId(id)
        
        if (validarId.status_code == 200) {
            
            deletarFilme = await filmeDAO.setDeleteMovies(id);
            MESSAGES.DEFAULT_HEADER.status                  =   MESSAGES.SUCCESS_DELETE.status
            MESSAGES.DEFAULT_HEADER.status_code             =   MESSAGES.SUCCESS_DELETE.status_code
            MESSAGES.DEFAULT_HEADER.message                 =   MESSAGES.SUCCESS_DELETE.message
            MESSAGES.DEFAULT_HEADER.items.deleted_movie     =   validarId.items.movie

            return MESSAGES.DEFAULT_HEADER

        } else {
            validarId
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Valida os dados vindos da requisição
const validarDadosFilme = async function (filme) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    //Validações de todas as entradas de dados
    if(filme.titulo == '' || filme.titulo == null || filme.titulo == undefined || filme.titulo.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Titulo Incorreto]' 
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