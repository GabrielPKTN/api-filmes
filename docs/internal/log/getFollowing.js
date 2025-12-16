module.exports = {
    get: {
        tags: ["EndPoints [LOG]"],
        description: 'Retorna os logs dos usuários que ele segue',
        operationId: 'buscarLogsSeguidores',
        parameters: [{
            name: "id",
            in: "path",
            description: "ID do post",
            required: true,
            schema: {
                type: "int",
                format: "int64"
            }
        }],
        responses: {
            200: {
                description: "Requisição bem sucedida",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/logExplore"
                        }
                    }
                }
            },
            400: {
                description: "Campo inválido",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error400"
                        }
                    }
                }
            },
            404: {
                description: "Não encontrado",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error404"
                        }
                    }
                }
            },
            500: {
                description: "Erros internos",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error500_controller"
                        }
                    }
                }
            },
            500: {
                description: "Erros internos",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error500_model"
                        }
                    }
                }
            }
        }
    }
}