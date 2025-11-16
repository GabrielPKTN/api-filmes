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
const getSelectAllMoviesGenres = async () => {

    try {

        sql = "select * from tb_filme_genero"

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

// Retorna o filme com genero pelo id
const getSelectMoviesGenresById = async (id) => {

    try {
        
        sql = `select * from tb_filme_genero where id = ${id}`

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
const getSelectGenresByIdMovies = async (movie_id) => {

    try {
        
        const sql = `select
                        tb_genero.id,
                        tb_genero.nome
                        
                        from tb_filme_genero
                        
                        join tb_filme 
                            on tb_filme.id = tb_filme_genero.id_filme
                        
                        join tb_genero 
                            on tb_genero.id = tb_filme_genero.id_genero
                            
                        where tb_filme.id = ${movie_id};`
        
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
const getSelectMoviesByIdGenres = async (genre_id) => {

    try {
        const sql = `select

                    tb_filme.id,
                    tb_filme.titulo

                    from tb_filme_genero
                        
                        join tb_filme
                            on tb_filme.id = tb_filme_genero.id_filme

                        join tb_genero
                            on tb_genero.id = tb_filme_genero.id_genero

                    where tb_genero.id = ${genre_id};`

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
const getSelectLastMovieGenre = async () => {

    try {
        
        sql = 'select * from tb_filme_genero order by id desc limit 1'

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
const setInsertMoviesGenres = async (movie_genre) => {
    
    try {
        
        sql = `INSERT INTO tb_filme_genero(id_filme, id_genero) 
            VALUES (
                '${movie_genre.id_filme}',
                '${movie_genre.id_genero}'
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
const setUpdateMoviesGenres = async (movie_genre) => {

    try {
        
        let sql =  `update tb_filme_genero set  
                    
                    id_filme = '${movie_genre.id_filme}',
                    id_genero = '${movie_genre.id_genero}

                    where id  = ${movie_genre.id}`

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
const setDeleteMoviesGenres = async (id) => {

    try {

        let sql = `delete from tb_filme_genero where id = ${id}`

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
    getSelectAllMoviesGenres,
    getSelectMoviesGenresById,
    getSelectMoviesByIdGenres,
    getSelectGenresByIdMovies,
    getSelectLastMovieGenre,
    setInsertMoviesGenres,
    setUpdateMoviesGenres,
    setDeleteMoviesGenres
}