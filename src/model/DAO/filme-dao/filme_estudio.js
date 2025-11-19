/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao relacionamento entre filme, e estudio
 * Data: 18/11/2025
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

//Lista todos os filmes e estudios com relação.
const getSelectMoviesStudios = async () => {

    try {
        sql = `select * from tb_filme_estudio`

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

//Lista um filme com relação a um estudio pelo id.
const getSelectMovieStudioById = async (id) => {

    try {
        
        sql = `select * from tb_filme_estudio where id = ${id}`

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

//Lista estudios relacionados a um filme pelo id do filme.
const getSelectStudiosByMovieId = async  (movie_id) => {

    try {
        
        sql = `select
            tb_estudio.id,
            tb_estudio.nome
            
            from tb_filme_estudio
            join tb_filme on 
                tb_filme.id = tb_filme_estudio.id_filme
                
            join tb_estudio on
                tb_estudio.id = tb_filme_estudio.id_estudio
                
            where tb_filme.id = ${movie_id}`

        result = await prisma.$executeRawUnsafe(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

//Lista filmes relacionados a um estudio pelo id do estudio.
const getSelectMoviesByStudioId = async (studio_id) => {

    try {

        sql = `select 
            tb_filme.id,
            tb_filme.titulo
            
            from tb_filme_estudio
            join tb_filme on
                tb_filme.id = tb_filme_estudio.id_filme
                
            join tb_estudio on
                tb_estudio.id = tb_filme_estudio.id_estudio
                
            where tb_estudio.id = ${studio_id}`

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

//Pega o ultimo registro inserido na tabela do filme_estudio.
const getSelectLastMovieStudio = async () => {

    try {

        sql = `select * from tb_filme_estudio order by id desc limit 1`

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

//Insere um registro de relação entre filme e estudio.
const setInsertMovieStudio = async (movie_studio) => {

    sql `insert into tb_filme_estudio(
        nome
    ) values (
        ${movie_studio.id_filme},
        ${movie_studio.id_estudio} 
    )`

    result = await prisma.$executeRawUnsafe(sql)

    if(result) {
        return result 
    } else {
        return false
    }

}

//Atualiza um registro de relação entre filme e estudio.
const setUpdateMovieStudio = async (id, movie_studio) => {

    try {
        
        sql = `update tb_filme_estudio set
                id_filme = ${movie_studio.id_filme},
                id_estudio = ${movie_studio.id_estudio}
                
                where id = ${id}`

        result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return result
        } else {
            return false
        }

    } catch (error) {
     
        return false

    }

}

const setDeleteMovieStudio = async (id) => {

    try {

        sql = `delete from tb_filme_estudio where id = ${id}`

        result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        
        return false

    }

}

module.exports = {

    getSelectMoviesStudios,
    getSelectMovieStudioById,
    getSelectStudiosByMovieId,
    getSelectMoviesByStudioId,
    getSelectLastMovieStudio,
    setInsertMovieStudio,
    setUpdateMovieStudio,
    setDeleteMovieStudio

}