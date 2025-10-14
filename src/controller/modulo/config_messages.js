/**********************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagens que o projeto irá realizar
 *          Sempre no formato JSON (Mensagens de erro e sucesso, etc.....)
 * Data: 07/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/


const dataAtual = new Date()


const DEFAULT_HEADER = 
{
    development: "Gabriel Lacerda",
    api_description: 'API para manipular dados de filmes',
    status: Boolean,
    status_code: Number,
    request_date: dataAtual.toString(),
    items: {}

}

// ********************************************************MENSAGENS DE SUCESSO

const SUCCESS_REQUEST = {
    status: true, 
    status_code:200, 
    message: 'Requisição bem sucedida!!!'
}


const SUCCESS_CREATED_ITEM = {
    status: true,
    status_code:201,
    message: 'Item criado com sucesso!!!'
}

// ********************************************************MENSAGENS DE ERRO

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foram encontrados, dados de retorno!!!'
}

const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: 'Não foi possível processar a requisição pois existem campos obrigatórios que devem ser encaminhados, e atendidos conforme documentação!!!'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a erros internos no servidor (CONTROLLER)!!!'
}

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a erros internos no servidor (MODELAGEM DE DADOS)!!!'
}

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Não foi possível processar a requisição, pois o tipo de dados enviado no corpo deve ser JSON!!!'
}


module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_REQUIRED_FIELDS,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE
}