/**********************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de fie
 * ao filme
 * Data: 01/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Importando dependencias da API
const express    = require('express')        // Responsável pela API
const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Retorna a porta do servidor atual ou colocamos uma porta local.
const PORT = process.PORT || 8000

// Criando uma instancia de uma classe do express
const app = express()

// Configuração de permissões
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')    // Servidor de origem
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Verbos permitidos

    // Carrega as configurações no CORS da API
    app.use(cors())
    next() // Próximo, carregar os próximos EndPoints 
})


//EndPoints para a rota de Filmes

const controllerFilme = require("./src/controller/filme/controller_filme.js")

app.get('/v1/locadora/filmes', cors(), async (req, res) => {
    let filmes = await controllerFilme.listarFilmes()
    

    res.status(filmes.status_code)
    res.json(filmes)
})

app.get('/v1/locadora/filme/:id', cors(), async (req, res) => {

    let id_filme = req.params.id

    let filme = await controllerFilme.buscarFilmeId(Number(id_filme))

    res.status(filme.status_code)
    res.json(filme)

})

app.post('/v1/locadora/filme', cors(), bodyParserJSON, async (req, res) => {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = req.body

    // Recebe o tipo de dados da requisição (JSON ou XML ou GraphQL ou ...)
    let contentType = req.headers['content-type']

    // Chama a função da controller para inserir o novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    res.status(filme.status_code)
    res.json(filme)
})

app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async (req, res) => {

    let idFilme = req.params.id
    let dadosBody = req.body
    let contentType = req.headers['content-type']


    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    
    res.status(filme.status_code)
    res.json(filme)

})

app.delete('/v1/locadora/delete/filme/:id', cors(), async (req, res) => {
    let idFilme = Number(req.params.id);
    let filme = await controllerFilme.excluirFilme(idFilme)
    res.status(filme.status_code)
    res.json(filme)
})

const controllerGenero = require("./src/controller/genero/controller_genero.js")

app.get('/v1/locadora/generos', cors(), async (req, res) => {

    let generos = await controllerGenero.listarGeneros()

    res.status(generos.status_code)
    res.json(generos)

})

app.get('/v1/locadora/genero/:id', cors(), async (req, res) => {
    
    let id = req.params.id

    let genero = await controllerGenero.buscarGeneroId(id)

    res.status(genero.status_code)
    res.json(genero)

})

app.post('/v1/locadora/genero', bodyParserJSON, cors(), async (req, res) => {

    let dadosBody = req.body
    let contentType = req.headers['content-type']

    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    res.status(genero.status_code)
    res.json(genero)

})

app.put('/v1/locadora/genero/:id', bodyParserJSON, cors(), async (req, res) => {
    
    let dadosBody = req.body
    let id = req.params.id
    let contentType = req.headers['content-type']

    let generoAtualizado = await controllerGenero.atualizarGenero(id, dadosBody, contentType)

    res.status(generoAtualizado.status_code)
    res.json(generoAtualizado)

})

app.delete('/v1/locadora/delete/genero/:id', cors(), async (req, res) => {

    let id = req.params.id

    let deleteGenero = await controllerGenero.excluirGenero(id)

    res.status(deleteGenero.status_code)
    res.json(deleteGenero)

})

const controllerCargo = require("./src/controller/cargo/controller_cargo.js")

app.get('/v1/locadora/cargo', cors(), async (req, res) => {

    let cargos = await controllerCargo.listarCargos()

    res.status(cargos.status_code)
    res.json(cargos)

})

app.get('/v1/locadora/cargo/:id', cors(), async (req, res) => {

    const id = req.params.id

    let cargo = await controllerCargo.buscarCargoId(id)

    res.status(cargo.status_code)
    res.json(cargo)

})


app.post('/v1/locadora/cargo', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let cargo = await controllerCargo.inserirCargo(dadosBody, contentType)

    res.status(cargo.status_code)
    res.json(cargo)

})

app.put('/v1/locadora/cargo/:id', cors(), bodyParserJSON, async (req, res) => {

    const id = req.params.id
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let cargo = await controllerCargo.atualizarCargo(id, dadosBody, contentType)

    res.status(cargo.status_code)
    res.json(cargo)

})


app.delete('/v1/locadora/cargo/:id', cors(), async (req, res) => {

    const id = req.params.id

    let deleteCargo = await controllerCargo.excluirCargo(id)

    res.status(deleteCargo.status_code)
    res.json(deleteCargo)

})

const controllerDistribuidora = require("./src/controller/distribuidora/controller_distribuidora.js")

app.get('/v1/locadora/distribuidora', cors(), async (req, res) => {

    let distribuidoras = await controllerDistribuidora.listarDistribuidora()

    res.status(distribuidoras.status_code)
    res.json(distribuidoras)

})

app.get('/v1/locadora/distribuidora/:id', cors(), async (req, res) => {

    let idDistribuidora = req.params.id

    let distribuidora = await controllerDistribuidora.buscarDistribuidoraId(idDistribuidora)

    res.status(distribuidora.status_code)
    res.json(distribuidora)

})

app.post('/v1/locadora/distribuidora', bodyParserJSON, cors(), async (req, res) => {

    let dadosBody = req.body
    let contentType = req.headers['content-type']

    let distribuidora = await controllerDistribuidora.inserirDistribuidora(dadosBody, contentType)

    res.status(distribuidora.status_code)
    res.json(distribuidora)

})

app.put('/v1/locadora/distribuidora/:id', bodyParserJSON, cors(), async (req, res) => {

    let distribuidoraId = req.params.id
    let dadosBody = req.body
    let contentType = req.headers['content-type']

    let atualizaDistribuidora = await controllerDistribuidora.atualizarDistribuidora(distribuidoraId, dadosBody, contentType)

    res.status(atualizaDistribuidora.status_code)
    res.json(atualizaDistribuidora)

})

app.delete('/v1/locadora/delete/distribuidora/:id', cors(), async (req, res) => {

    let distribuidoraId = req.params.id

    let deleteDistribuidora = await controllerDistribuidora.excluirDistribuidora(distribuidoraId)

    res.status(deleteDistribuidora.status_code)
    res.json(deleteDistribuidora)

})

const controllerEstudio = require("./src/controller/estudio/controller_estudio.js")

app.get('/v1/locadora/estudio/', cors(), async (req, res) => {

    let estudios = await controllerEstudio.listarEstudios()

    res.status(estudios.status_code)
    res.json(estudios)

})

app.get('/v1/locadora/estudio/:id', cors(), async (req, res) => {

    const id = req.params.id

    let estudio = await controllerEstudio.buscarEstudioId(id)

    res.status(estudio.status_code)
    res.json(estudio)

})

app.post('/v1/locadora/estudio/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let estudio = await controllerEstudio.inserirEstudio(dadosBody, contentType)

    res.status(estudio.status_code)
    res.json(estudio)

})

app.put('/v1/locadora/estudio/:id', cors(), bodyParserJSON, async (req, res) => {

    const id = req.params.id
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let estudio = await controllerEstudio.atualizarEstudio(id, dadosBody, contentType)

    res.status(estudio.status_code)
    res.json(estudio)

})

app.delete('/v1/locadora/delete/estudio/:id', cors(), async (req, res) => {

    const id = req.params.id

    let estudio = await controllerEstudio.excluirEstudio(id)

    res.status(estudio.status_code)
    res.json(estudio)

})

const controllerPapel = require('./src/controller/papel/controller_papel.js')

app.get('/v1/locadora/papel/', cors(), async (req, res) => {

    let papeis = await controllerPapel.listarPapeis()

    res.status(papeis.status_code)
    res.json(papeis)

})

app.get('/v1/locadora/papel/:id', cors(), async (req, res) => {

    const id = req.params.id

    let papel = await controllerPapel.buscarPapelId(id)

    res.status(papel.status_code)
    res.json(papel)

})

app.post('/v1/locadora/papel/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let papel = await controllerPapel.inserirPapel(dadosBody, contentType)

    res.status(papel.status_code)
    res.json(papel)

})

app.put('/v1/locadora/papel/:id', cors(), bodyParserJSON, async (req, res) => {

    const id = req.params.id
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let papel = await controllerPapel.atualizarPapel(id, dadosBody, contentType)

    res.status(papel.status_code)
    res.json(papel)

})

app.delete('/v1/locadora/delete/papel/:id', cors(), async (req, res) => {

    const id = req.params.id

    let papel = await controllerPapel.excluirPapel(id)

    res.status(papel.status_code)
    res.json(papel)

})

const controllerIdioma = require('./src/controller/idioma_dublagem/controller_idioma_dublagem.js')

app.get('/v1/locadora/idioma/', cors(), async (req, res) => {

    let idiomas = await controllerIdioma.listarIdiomas()

    res.status(idiomas.status_code)
    res.json(idiomas)

})

app.get('/v1/locadora/idioma/:id', cors(), async (req, res) => {

    const id = req.params.id

    let idioma = await controllerIdioma.buscarIdiomaId(id)

    res.status(idioma.status_code)
    res.json(idioma)

})

app.post('/v1/locadora/idioma/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let idioma = await controllerIdioma.inserirIdioma(dadosBody, contentType)

    res.status(idioma.status_code)
    res.json(idioma)

})

app.put('/v1/locadora/idioma/:id', cors(), bodyParserJSON, async (req, res) => {

    const id = req.params.id
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    let idioma = await controllerIdioma.atualizarIdioma(id, dadosBody, contentType)

    res.status(idioma.status_code)
    res.json(idioma)

})

app.delete('/v1/locadora/delete/idioma/:id', cors(), async (req, res) => {

    const id = req.params.id

    let idioma = await controllerIdioma.excluirIdioma(id)

    res.status(idioma.status_code)
    res.json(idioma)

})

app.listen(PORT, () => {
    console.log('Está vivo...!!!')
})