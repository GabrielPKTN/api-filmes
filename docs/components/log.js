module.exports = {
    log: {
        type: 'object',
        properties: {
            "log_id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "descricao": {
                "type": "string",
                "description": "description",
                "example": "Férias nas maldivas, com minha linda companheira no ano de 2025."
            },
            "data_postagem": {
                "type": "string",
                "description": "data_inicio",
                "example": "2025-10-24"
            },
            "curtidas": {
                "type": "int",
                "description": "curtidas",
                "example": 0
            },
            "favoritos": {
                "type": "int",
                "description": "favoritos",
                "example": 0
            },
            "local": {
                "type": "array",
                "items": {
                    $ref: '#/components/schemas/local'
                }
            },
            "midias": {
                "type": "array",
                "items": {
                    $ref: '#/components/schemas/midia'
                }
            }
            
        }
    },

    logExplore: {
        type: "object",
        properties:{

            "usuario_id": {
                "type": "int",
                "description": "usuario_id",
                "example": 1
            },
            "apelido": {
                "type": "string",
                "description": "apelido",
                "example": "lacerda"
            },
            "foto_perfil": {
                "type": "string",
                "description": "apelido",
                "example": "http://storage.photo"
            },
            "log": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/log"
                }
            },
            "viagem": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/travelAlias"
                }
            },
            "curtido": {
                "type": "boolean",
                "description": "curtido",
                "example": false
            },
            "favoritado": {
                "type": "boolean",
                "description": "favoritado",
                "example": false
            }
        }
    },

    logCreate: {
        type: 'object',
        properties: {
            "descricao": {
                "type": "string",
                "description": "descricao",
                "example": "Férias nas maldivas, com minha linda companheira no ano de 2025."
            },
            "viagem_id": {
                "type": "int",
                "description": "viagem_id",
                "example": 1
            },
            "visivel": {
                "type": "boolean",
                "description": "visivel",
                "example": true
            },
            "nome_pais": {
                "type": "string",
                "description": "nome_pais",
                "example": "Brasil"
            },
            "estado": {
                "type": "string",
                "description": "estado",
                "example": "São Paulo"
            },
            "cidade": {
                "type": "string",
                "description": "cidade",
                "example": "Jandira"
            },
            "nome_local": {
                "type": "string",
                "description": "nome_local",
                "example": "Jandira Plaza Shopping"
            },
            "midias": {
                "type": "array",
                "items": {
                    $ref: '#/components/schemas/midiaCreate'
                }
            }
        }
    },

    travelGetLog: {

        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "descricao": {
                "type": "string",
                "description": "description",
                "example": "Férias nas maldivas, com minha linda companheira no ano de 2025."
            },
            "data": {
                "type": "string",
                "description": "data_inicio",
                "example": "2025-10-24"
            },
            "curtidas": {
                "type": "int",
                "description": "curtidas",
                "example": 0
            },
            "favoritados": {
                "type": "int",
                "description": "favoritados",
                "example": 0
            },
            "local": {
                $ref: "#/components/schemas/local"
            }
        }

    },

    logInsert: {
        "type": 'object',
        properties: {
            "log_id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "descricao": {
                "type": "string",
                "description": "description",
                "example": "Férias nas maldivas, com minha linda companheira no ano de 2025."
            },
            "data_postagem": {
                "type": "string",
                "description": "data_inicio",
                "example": "2025-10-24"
            },
            "curtidas": {
                "type": "int",
                "description": "curtidas",
                "example": 0
            },
            "favoritos": {
                "type": "int",
                "description": "favoritos",
                "example": 0
            },
             "midias": {
                "type": "array",
                "items": {
                    $ref: '#/components/schemas/midia'
                }
            }
        }
    }
}