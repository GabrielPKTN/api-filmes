/************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao genero
 * Data: 22/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 ************************************************************************/

//Import da dependência do prisma que permite a execução do de script SQL no BD 
const {PrismaClient} = require('../../generated/prisma') 

//Cria um novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

    //$queryRawUnsafe -> permite  executar scripts SQL de uma
    //de uma variável e que retorna valores o banco (SELECT)

    //$executeRawUnsafe -> permite executar script SQL de uma
    //variável e que não retorna dados do banco (INSERT, UPDATE e DELETE)

    //$queryRaw ->  permite  executar scripts SQL de uma
    //de uma variável e que retorna valores o banco (SELECT)
    //e executa tratamentos com segurança

    //$executeRaw -> permite executar script SQL de uma
    //variável e que não retorna dados do banco (INSERT, UPDATE e DELETE)
    //e executa tratamentos com segurança


const getSelectAllGenre = async () => {

    try {

        sql = "select * from tb_genero order by genero_id asc"

        result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            
            return result

        } else {
            
            return false

        }

    } catch (error) {

        return false

    }
    
}

const getSelectGenreById = async () => {

}

const getSelectLastId = async () => {

}

const setInsertGenres = async () => {

}

const setUpdateGenres = async () => {

}

const setDeleteGenres = async () => {

}

module.exports = {
    getSelectAllGenre
}