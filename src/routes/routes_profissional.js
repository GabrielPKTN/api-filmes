/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller do profissional
 * Data: 22/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerProfissional = require('../controller/profissional/controller_profissional.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json() // Cria um objeto especialista no formato JSON para receber dados via POST e PUT

router.get('/profissional/', cors(), async (req, res) => {

    let profissional = await controllerProfissional.listarProfissionais()

    res.status(profissional.status_code)
    res.json(profissional)

})

router.get('/profissional/:id', cors(), async (req, res) => {

    const id = req.params.id

    let profissional = await controllerProfissional.buscarProfissionalId(id)

    res.status(profissional.status_code)
    res.json(profissional)

})

router.post('/profissional/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let profissional = await controllerProfissional.inserirProfissional(dadosBody, contentType)

    res.status(profissional.status_code)
    res.json(profissional)

})

router.put('/profissional/:id', cors(), bodyParserJSON, async (req, res) => {

    const id = req.params.id
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let profissional = await controllerProfissional.atualizarProfissional(id, dadosBody, contentType)

    res.status(profissional.status_code)
    res.json(profissional)

})

router.delete('/delete/profissional/:id', cors(), async (req, res) => {

    const id = req.params.id

    let profissional = await controllerProfissional.excluirProfissional(id)

    res.status(profissional.status_code)
    res.json(profissional)

})

module.exports = router