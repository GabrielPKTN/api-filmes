/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller da equipe tecnica
 * Data: 04/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerEquipeTecnica = require("../controller/equipe_tecnica/controller_equipe_tecnica.js")

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json() // Cria um objeto especialista no formato JSON para receber dados via POST e PUT

router.get('/equipe/', cors(), async (req, res) => {

    let equipes = await controllerEquipeTecnica.listarEquipes()

    res.status(equipes.status_code)
    res.json(equipes)

})

router.get('/equipe/:id', cors(), async (req, res) => {

    let idEquipe = req.params.id

    let equipe = await controllerEquipeTecnica.buscarEquipeId(idEquipe)

    res.status(equipe.status_code)
    res.json(equipe)

})

router.post('/equipe', bodyParserJSON, cors(), async (req, res) => {

    let dadosBody = req.body
    let contentType = req.headers['content-type']

    let equipe = await controllerEquipeTecnica.inserirEquipe(dadosBody, contentType)

    res.status(equipe.status_code)
    res.json(equipe)

})

router.put('/equipe/:id', bodyParserJSON, cors(), async (req, res) => {

    let equipeId = req.params.id
    let dadosBody = req.body
    let contentType = req.headers['content-type']

    let atualizaEquipe = await controllerEquipeTecnica.atualizarEquipe(equipeId, dadosBody, contentType)

    res.status(atualizaEquipe.status_code)
    res.json(atualizaEquipe)

})

router.delete('/delete/equipe/:id', cors(), async (req, res) => {

    let equipeId = req.params.id

    let deleteEquipe = await controllerEquipeTecnica.excluirEquipe(equipeId)

    res.status(deleteEquipe.status_code)
    res.json(deleteEquipe)

})

module.exports = router