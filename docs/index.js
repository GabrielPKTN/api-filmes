const basicInfo  = require('./basicInfo')
const components = require('./components')
const paths      = require('./paths')

module.exports = {
    ...basicInfo, // Informações básicas do projeto
    ...components, // Componentes da aplicação
    ...paths // Rotas de acesso da aplicação
}