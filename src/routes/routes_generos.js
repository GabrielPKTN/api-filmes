/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller do genero
 * Data: 04/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerGenero = require('../controller/genero/controller_genero.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json() // Cria um objeto especialista no formato JSON para receber dados via POST e PUT

router.get('/generos', cors(), async (req, res) => {

    let generos = await controllerGenero.listarGeneros()

    res.status(generos.status_code)
    res.json(generos)

})

router.get('/genero/:id', cors(), async (req, res) => {
    
    let id = req.params.id

    let genero = await controllerGenero.buscarGeneroId(id)

    res.status(genero.status_code)
    res.json(genero)

})

router.post('/genero', cors(), bodyParserJSON, async (req, res) => {

    let dadosBody = req.body
    let contentType = req.headers['content-type']

    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    res.status(genero.status_code)
    res.json(genero)

})

router.put('/genero/:id', cors(), bodyParserJSON, async (req, res) => {
    
    let dadosBody = req.body
    let id = req.params.id
    let contentType = req.headers['content-type']

    let generoAtualizado = await controllerGenero.atualizarGenero(id, dadosBody, contentType)

    res.status(generoAtualizado.status_code)
    res.json(generoAtualizado)

})

router.delete('/delete/genero/:id', cors(), async (req, res) => {

    let id = req.params.id

    let deleteGenero = await controllerGenero.excluirGenero(id)

    res.status(deleteGenero.status_code)
    res.json(deleteGenero)

})

module.exports = router