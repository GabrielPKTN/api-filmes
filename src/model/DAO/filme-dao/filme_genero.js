/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao relacionamento entre filme, e genero
 * Data: 05/11/2025
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

// Retorna todos os filmes e generos da tabela
const getSelectAllFilmsGenres = async () => {

    try {

        sql = "select * from tb_filme_genero"

        result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            
            return result

        } else {
            
            return false

        }

    } catch (error) {
        console.log(error)
        return false

    }
    
}

// Retorna o filme com genero pelo id
const getSelectFilmsGenresById = async (id) => {

    try {
        
        sql = `select * from tb_filme_genero where filme_genero_id = ${id}`

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

// Retorna o retorna um lista de generos filtrando pelo id do filme
const getSelectGenresByIdFilms = async (filmId) => {

    try {
        
        const sql = `select
                        g.genero_id,
                        g.nome_genero
                        from tb_filme_genero fg
                            
                            join tb_filmes f 
                                on f.filme_id = fg.filme_id

                            join tb_genero g 
                                on g.genero_id = fg.genero_id

                        where f.filme_id = ${filmId}`
        
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

// Retorna o retorna um lista de filmes filtrando pelo id do genero
const getSelectFilmsByIdGenres = async (genreId) => {

    try {
        const sql = `select
                        g.nome_genero as genero,
                        f.filme_id,
                        f.nome
                        from tb_filme_genero fg
                            
                            join tb_filmes f 
                                on f.filme_id = fg.filme_id

                            join tb_genero g 
                                on g.genero_id = fg.genero_id

                        where g.genero_id = ${genreId}`

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
const getSelectLastId = async () => {

    try {
        
        sql = 'select * from tb_filme_genero order by filme_genero_id desc limit 1'

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
const setInsertFilmsGenres = async (filmGenre) => {
    
    try {
        
        sql = `INSERT INTO tb_filme_genero(filme_id, genero_id) 
            VALUES (
                '${filmGenre.filme_id}',
                '${filmGenre.genero_id}'
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
const setUpdateFilmsGenres = async (filmGenre) => {

    try {
        
        let sql =  `update tb_filme_genero set  
                    
                    filme_id = '${filmGenre.filme_id}',
                    genero_id = '${filmGenre.genero_id}

                    where filme_genero_id  = ${filmGenre.id}`

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
const setDeleteFilmsGenres = async (id) => {

    try {

        let sql = `delete from tb_filme_genero where filme_genero_id = ${id}`

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
    getSelectAllFilmsGenres,
    getSelectFilmsGenresById,
    getSelectFilmsByIdGenres,
    getSelectGenresByIdFilms,
    getSelectLastId,
    setInsertFilmsGenres,
    setUpdateFilmsGenres,
    setDeleteFilmsGenres
}