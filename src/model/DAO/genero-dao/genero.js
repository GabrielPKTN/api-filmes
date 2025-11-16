/************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao genero
 * Data: 22/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 ************************************************************************/

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

// Retorna todos os generos da tabela
const getSelectAllGenre = async () => {

    try {

        sql = "select * from tb_genero order by id asc"

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

// Retorna o genero pelo id
const getSelectGenreById = async (id) => {

    try {
        
        sql = `select * from tb_genero where id = ${id}`

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

// Retorna o último id de genero registrado na tabela
const getSelectLastGenre = async () => {

    try {
        
        sql = 'select * from tb_genero order by id desc limit 1'

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

// Registra um gênero na tabela
const setInsertGenres = async (genero) => {
    
    try {
        
        sql = `INSERT INTO tb_genero(nome) 
            VALUES (
                '${genero.nome}'
            );`

        result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            
            return result

        } else {

            return false

        }

    } catch (error) {

        return false

    }
    

}

// Atualiza o registro de um gênero na tabela pelo id
const setUpdateGenres = async (id, genero) => {

    try {
        
        let sql =  `update tb_genero set nome = '${genero.nome}' where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

    

}

// Deleta um registro da tabela gênero pelo id
const setDeleteGenre = async (id) => {

    try {

        let sql = `delete from tb_genero where id = ${id}`

        let result = prisma.$executeRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

module.exports = {
    getSelectAllGenre,
    getSelectGenreById,
    getSelectLastGenre,
    setInsertGenres,
    setUpdateGenres,
    setDeleteGenre
}