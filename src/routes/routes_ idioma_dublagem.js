/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para da 
 * controller idioma_dublagem
 * Data: 04/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerIdioma = require('../controller/idioma_dublagem/controller_idioma_dublagem.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json() // Cria um objeto especialista no formato JSON para receber dados via POST e PUT

router.get('/idioma/', cors(), async (req, res) => {

    let idiomas = await controllerIdioma.listarIdiomas()

    res.status(idiomas.status_code)
    res.json(idiomas)

})

router.get('/idioma/:id', cors(), async (req, res) => {

    const id = req.params.id

    let idioma = await controllerIdioma.buscarIdiomaId(id)

    res.status(idioma.status_code)
    res.json(idioma)

})

router.post('/idioma/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let idioma = await controllerIdioma.inserirIdioma(dadosBody, contentType)

    res.status(idioma.status_code)
    res.json(idioma)

})

router.put('/idioma/:id', cors(), bodyParserJSON, async (req, res) => {

    const id = req.params.id
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let idioma = await controllerIdioma.atualizarIdioma(id, dadosBody, contentType)

    res.status(idioma.status_code)
    res.json(idioma)

})

router.delete('/delete/idioma/:id', cors(), async (req, res) => {

    const id = req.params.id

    let idioma = await controllerIdioma.excluirIdioma(id)

    res.status(idioma.status_code)
    res.json(idioma)

})

module.exports = router