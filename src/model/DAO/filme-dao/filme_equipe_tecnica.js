/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao relacionamento entre filme, e equipe tecnica
 * Data: 16/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

//Import da dependência do prisma que permite a execução do de script SQL no BD 
const {PrismaClient} = require('../../../generated/prisma') 

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

// Retorna todos a equipe pelo id do filme
const getSelectTeamByMovieId = async (movie_id) => {

    try {
        
        sql = `SELECT * FROM tb_equipe_tecnica WHERE id_filme = ${movie_id}`

        result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)) {

            return result

        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

module.exports = {

    getSelectTeamByMovieId
    
}