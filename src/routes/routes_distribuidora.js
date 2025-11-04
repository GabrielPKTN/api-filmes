/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller da distribuidora
 * Data: 04/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerDistribuidora = require("../controller/distribuidora/controller_distribuidora.js")

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json() // Cria um objeto especialista no formato JSON para receber dados via POST e PUT

router.get('/distribuidora', cors(), async (req, res) => {

    let distribuidoras = await controllerDistribuidora.listarDistribuidora()

    res.status(distribuidoras.status_code)
    res.json(distribuidoras)

})

router.get('/distribuidora/:id', cors(), async (req, res) => {

    let idDistribuidora = req.params.id

    let distribuidora = await controllerDistribuidora.buscarDistribuidoraId(idDistribuidora)

    res.status(distribuidora.status_code)
    res.json(distribuidora)

})

router.post('/distribuidora', bodyParserJSON, cors(), async (req, res) => {

    let dadosBody = req.body
    let contentType = req.headers['content-type']

    let distribuidora = await controllerDistribuidora.inserirDistribuidora(dadosBody, contentType)

    res.status(distribuidora.status_code)
    res.json(distribuidora)

})

router.put('/distribuidora/:id', bodyParserJSON, cors(), async (req, res) => {

    let distribuidoraId = req.params.id
    let dadosBody = req.body
    let contentType = req.headers['content-type']

    let atualizaDistribuidora = await controllerDistribuidora.atualizarDistribuidora(distribuidoraId, dadosBody, contentType)

    res.status(atualizaDistribuidora.status_code)
    res.json(atualizaDistribuidora)

})

router.delete('/delete/distribuidora/:id', cors(), async (req, res) => {

    let distribuidoraId = req.params.id

    let deleteDistribuidora = await controllerDistribuidora.excluirDistribuidora(distribuidoraId)

    res.status(deleteDistribuidora.status_code)
    res.json(deleteDistribuidora)

})

module.exports = router