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

app.listen(PORT, () => {
    console.log('Está vivo...!!!')
})