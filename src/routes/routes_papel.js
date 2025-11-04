/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller do papel
 * Data: 04/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerPapel = require('../controller/papel/controller_papel.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json() // Cria um objeto especialista no formato JSON para receber dados via POST e PUT

router.get('/papel/', cors(), async (req, res) => {

    let papeis = await controllerPapel.listarPapeis()

    res.status(papeis.status_code)
    res.json(papeis)

})

router.get('/papel/:id', cors(), async (req, res) => {

    const id = req.params.id

    let papel = await controllerPapel.buscarPapelId(id)

    res.status(papel.status_code)
    res.json(papel)

})

router.post('/papel/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let papel = await controllerPapel.inserirPapel(dadosBody, contentType)

    res.status(papel.status_code)
    res.json(papel)

})

router.put('/papel/:id', cors(), bodyParserJSON, async (req, res) => {

    const id = req.params.id
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let papel = await controllerPapel.atualizarPapel(id, dadosBody, contentType)

    res.status(papel.status_code)
    res.json(papel)

})

router.delete('/delete/papel/:id', cors(), async (req, res) => {

    const id = req.params.id

    let papel = await controllerPapel.excluirPapel(id)

    res.status(papel.status_code)
    res.json(papel)

})

module.exports = router