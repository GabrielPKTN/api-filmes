/**********************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagens que o projeto irá realizar
 *          Sempre no formato JSON (Mensagens de erro e sucesso, etc.....)
 * Data: 07/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/


const { request } = require("express");

const dataAtual = new Date()

const MESSAGE_HEADER = 
{
    development: "Gabriel Lacerda",
    api_description: 'API para manipular dados de filmes',
    status: Boolean,
    status_code: Number,
    request_date: dataAtual.getTimezoneOffset(),
    items: {}

}

const MESSAGE_REQUEST_SUCCES = { status: true, status_code:200, message: 'Requisição bem sucedida!!!' }


module.exports = {
    MESSAGE_HEADER,
    MESSAGE_REQUEST_SUCCES
}