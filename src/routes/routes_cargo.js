/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller do cargo
 * Data: 04/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerCargo = require("../controller/cargo/controller_cargo.js")

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json() // Cria um objeto especialista no formato JSON para receber dados via POST e PUT

router.get('/cargo', cors(), async (req, res) => {

    let cargos = await controllerCargo.listarCargos()

    res.status(cargos.status_code)
    res.json(cargos)

})

router.get('/cargo/:id', cors(), async (req, res) => {

    const id = req.params.id

    let cargo = await controllerCargo.buscarCargoId(id)

    res.status(cargo.status_code)
    res.json(cargo)

})


router.post('/cargo', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let cargo = await controllerCargo.inserirCargo(dadosBody, contentType)

    res.status(cargo.status_code)
    res.json(cargo)

})

router.put('/cargo/:id', cors(), bodyParserJSON, async (req, res) => {

    const id = req.params.id
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let cargo = await controllerCargo.atualizarCargo(id, dadosBody, contentType)

    res.status(cargo.status_code)
    res.json(cargo)

})


router.delete('/cargo/:id', cors(), async (req, res) => {

    const id = req.params.id

    let deleteCargo = await controllerCargo.excluirCargo(id)

    res.status(deleteCargo.status_code)
    res.json(deleteCargo)

})

module.exports = router