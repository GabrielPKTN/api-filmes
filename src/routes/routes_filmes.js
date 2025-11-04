/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller do filme
 * Data: 04/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerFilme = require('../controller/filme/controller_filme.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json() // Cria um objeto especialista no formato JSON para receber dados via POST e PUT

router.get('/filmes', cors(), async (req, res) => {
    let filmes = await controllerFilme.listarFilmes()
    

    res.status(filmes.status_code)
    res.json(filmes)
})

router.get('/filme/:id', cors(), async (req, res) => {

    let id_filme = req.params.id

    let filme = await controllerFilme.buscarFilmeId(Number(id_filme))

    res.status(filme.status_code)
    res.json(filme)

})

router.post('/filme', cors(), bodyParserJSON, async (req, res) => {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = req.body

    // Recebe o tipo de dados da requisição (JSON ou XML ou GraphQL ou ...)
    let contentType = req.headers['content-type']

    // Chama a função da controller para inserir o novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    res.status(filme.status_code)
    res.json(filme)
})

router.put('/filme/:id', cors(), bodyParserJSON, async (req, res) => {

    let idFilme = req.params.id
    let dadosBody = req.body
    let contentType = req.headers['content-type']


    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    
    res.status(filme.status_code)
    res.json(filme)

})

router.delete('/delete/filme/:id', cors(), async (req, res) => {
    let idFilme = Number(req.params.id);
    let filme = await controllerFilme.excluirFilme(idFilme)

    res.status(filme.status_code)
    res.json(filme)
})

module.exports = router