const log       = require("./log.js")

module.exports = {
    components: {
        schemas: {
            ...log,

            success_delete: {
                type: "object",
                properties: {
                    status: {
                        type: "boolean",
                        description: "true",
                        example: "true"
                    },
                    status_code: {
                        type: "integer",
                        description: "200",
                        example: "200"
                    },
                    message: {
                        type: "string",
                        description: "Delete realizado com sucesso!!!",
                        example: "Delete realizado com sucesso!!!"
                    }       
                }
            },
            success_update: {
                type: "object",
                properties: {
                    status: {
                        type: "boolean",
                        description: "true",
                        example: "true"
                    },
                    status_code: {
                        type: "integer",
                        description: "200",
                        example: "200"
                    },
                    message: {
                        type: "string",
                        description: "Item atualizado com sucesso!!!",
                        example: "Item atualizado com sucesso!!!"
                    }       
                }
            },
            success_insert: {
                type: "object",
                properties: {
                    status: {
                        type: "boolean",
                        description: "true",
                        example: "true"
                    },
                    status_code: {
                        type: "integer",
                        description: "201",
                        example: "201"
                    },
                    message: {
                        type: "string",
                        description: "Item criado com sucesso!!!",
                        example: "Item criado com sucesso!!!"
                    }       
                }
            },
            error404: {
                type: "object",
                properties: {
                    status: {
                        type: "boolean",
                        description: "false",
                        example: "false"
                    },
                    status_code: {
                        type: "integer",
                        description: "404",
                        example: "404"
                    },
                    message: {
                        type: "string",
                        description: "Não foram encontrados, dados de retorno!!!",
                        example: "Não foram encontrados, dados de retorno!!!"
                    }       
                }    
            },
            error400: {
                type: "object",
                properties: {
                    status: {
                        type: "boolean",
                        description: "false",
                        example: "false"
                    },
                    status_code: {
                        type: "int",
                        description: "400",
                        example: "400"
                    },
                    message: {
                        type: "string",
                        description: "Não foi possível processar a requisição pois existem campos obrigatórios que devem ser encaminhados, e atendidos conforme documentação!!!",
                        example: "Não foi possível processar a requisição pois existem campos obrigatórios que devem ser encaminhados, e atendidos conforme documentação!!!"
                    }
                }
            },
            error500_controller: {
                type: "object",
                properties: {
                    status: {
                        type: "boolean",
                        description: "false",
                        example: "false"
                    },
                    status_code: {
                        type: "int",
                        description: "500",
                        example: "500"
                    },
                    message: {
                        type: "string",
                        description: "Não foi possível processar a requisição devido a erros internos no servidor (CONTROLLER)!!!",
                        example: "Não foi possível processar a requisição devido a erros internos no servidor (CONTROLLER)!!!"
                    }       
                }
            },
            error500_model: {
                type: "object",
                properties: {
                    status: {
                        type: "boolean",
                        description: "false",
                        example: "false"
                    },
                    status_code: {
                        type: "int",
                        description: "500",
                        example: "500"
                    },
                    message: {
                        type: "string",
                        description: "Não foi possível processar a requisição devido a erros internos no servidor (MODELAGEM DE DADOS)!!!",
                        example: "Não foi possível processar a requisição devido a erros internos no servidor (MODELAGEM DE DADOS)!!!"
                    }       
                }
            },
            error415: {
                type: "object",
                properties: {
                    status: {
                        type: "boolean",
                        description: "false",
                        example: "false"
                    },
                    status_code: {
                        type: "int",
                        description: "415",
                        example: "415"
                    },
                    message: {
                        type: "string",
                        description: "Não foi possível processar a requisição, pois o tipo de dados enviado no corpo deve ser JSON!!!",
                        example: "Não foi possível processar a requisição, pois o tipo de dados enviado no corpo deve ser JSON!!!"
                    }       
                }
            },
            error500_relatinal_insertion: {
                type: "object",
                properties: {
                    status: {
                        type: "boolean",
                        description: "false",
                        example: "false"
                    },
                    status_code: {
                        type: "int",
                        description: "500",
                        example: "500"
                    },
                    message: {
                        type: "string",
                        description: "A requisição do item principal foi processada com sucesso, porém houveram problemas ao inserir dados na tabela de relação!!!",
                        example: "A requisição do item principal foi processada com sucesso, porém houveram problemas ao inserir dados na tabela de relação!!!"
                    }       
                }
            }

        }
    }
}