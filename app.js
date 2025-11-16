/**********************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de fie
 * ao filme
 * Data: 01/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.1
 *********************************************************************/

// Importando dependencias da API
const express    = require('express')        // Responsável pela API
const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

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

// Importa rotas da aplicação
const filmeRoutes = require("./src/routes/routes_filmes.js")
const generoRoutes = require("./src/routes/routes_generos.js")
const cargoRoutes = require("./src/routes/routes_cargo.js")
const distribuidoraRoutes = require("./src/routes/routes_distribuidora.js")
const estudioRoutes = require("./src/routes/routes_estudio.js")
const papelRoutes = require("./src/routes/routes_papel.js")
const idiomaRoutes = require("./src/routes/routes_idioma.js")

// EndPoints de routes
app.use('/v1/locadora', filmeRoutes)
app.use('/v1/locadora', generoRoutes)
app.use('/v1/locadora', cargoRoutes)
app.use('/v1/locadora', distribuidoraRoutes)
app.use('/v1/locadora', estudioRoutes)
app.use('/v1/locadora', papelRoutes)
app.use('/v1/locadora', idiomaRoutes)

// DOCUMENTAÇÃO SWAGGER!!
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
    console.log('Está vivo...!!!')
})