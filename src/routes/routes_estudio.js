/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller do estudio
 * Data: 04/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerEstudio = require("../controller/estudio/controller_estudio.js")

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json() // Cria um objeto especialista no formato JSON para receber dados via POST e PUT

router.get('/estudio/', cors(), async (req, res) => {

    let estudios = await controllerEstudio.listarEstudios()

    res.status(estudios.status_code)
    res.json(estudios)

})

router.get('/estudio/:id', cors(), async (req, res) => {

    const id = req.params.id

    let estudio = await controllerEstudio.buscarEstudioId(id)

    res.status(estudio.status_code)
    res.json(estudio)

})

router.post('/estudio/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let estudio = await controllerEstudio.inserirEstudio(dadosBody, contentType)

    res.status(estudio.status_code)
    res.json(estudio)

})

router.put('/estudio/:id', cors(), bodyParserJSON, async (req, res) => {

    const id = req.params.id
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let estudio = await controllerEstudio.atualizarEstudio(id, dadosBody, contentType)

    res.status(estudio.status_code)
    res.json(estudio)

})

router.delete('/delete/estudio/:id', cors(), async (req, res) => {

    const id = req.params.id

    let estudio = await controllerEstudio.excluirEstudio(id)

    res.status(estudio.status_code)
    res.json(estudio)

})

module.exports = router