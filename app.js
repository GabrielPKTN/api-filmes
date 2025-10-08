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

    let filme = await controllerFilme.buscarFilmeId(id_filme)

    res.status(filme.status_code)
    res.json(filme)

})

app.listen(PORT, () => {
    console.log('Está vivo...!!!')
})