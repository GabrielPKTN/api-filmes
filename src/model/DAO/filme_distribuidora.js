/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao relacionamento entre filme, e distribuidora
 * Data: 12/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

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

// Retorna todos os filmes e distribuidoras da tabela
const getSelectAllFilmsDistributor = async () => {

    try {

        sql = "select * from tb_filme_distribuidora"

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

// Retorna o filme com a distribuidora pelo id
const getSelectFilmsDistributorsById = async (id) => {

    try {
        
        sql = `select * from tb_filme_distribuidora where id = ${id}`

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

// Retorna o retorna um lista de distribuidoras filtrando pelo id do filme
const getSelectDistributorsByIdFilms = async (filmId) => {

    try {
        
        const sql = `select
		            tb_distribuidora.id,
		            tb_distribuidora.nome

		            from tb_filme_distribuidora
                            
			            join tb_filme on
                            tb_filme.id = tb_filme_distribuidora.filme_id

			            join tb_distribuidora on
				            tb_distribuidora.id = tb_filme_distribuidora.distribuidora_id

			            where tb_filme.id = ${filmId}`
        
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

// Retorna uma lista de filmes filtrando pelo id da distribuidora
const getSelectFilmsByIdDistributors = async (distributorId) => {

    try {
        const sql = `select
		            tb_filme.id,
		            tb_filme.titulo

		            from tb_filme_distribuidora
                            
			            join tb_filme on
                            tb_filme.id = tb_filme_distribuidora.filme_id

			            join tb_distribuidora on
				            tb_distribuidora.id = tb_filme_distribuidora.distribuidora_id

			            where tb_distribuidora.id = ${distributorId}`

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

// Retorna o último id de filme com distribuidora registrado na tabela
const getSelectLastId = async () => {

    try {
        
        sql = 'select * from tb_filme_distribuidora order by id desc limit 1'

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
const setInsertFilmsDistributors = async (filmDistributor) => {
    
    try {
        
        sql = `INSERT INTO tb_filme_distribuidora(id_distribuidora, id_filme) 
            VALUES (
                '${filmDistributor.id_filme}',
                '${filmDistributor.id_distribuidora}'
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

// Atualiza o registro de um filme com distribuidora na tabela pelo id
const setUpdateFilmsDistributors = async (filmDistributor) => {

    try {
        
        let sql =  `update tb_filme_distribuidora set  
                    
                    id_filme = '${filmDistributor.id_filme}',
                    id_distribuidora = '${filmDistributor.id_distribuidora}

                    where filme_distribuidora_id  = ${filmDistributor.id}`

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

// Deleta um registro da tabela filme_distribuidora pelo id
const setDeleteFilmsDistributors = async (id) => {

    try {

        let sql = `delete from tb_filme_distribuidora where id = ${id}`

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

    getSelectAllFilmsDistributor,
    getSelectFilmsDistributorsById,
    getSelectDistributorsByIdFilms,
    getSelectFilmsByIdDistributors,
    getSelectLastId,
    setInsertFilmsDistributors,
    setUpdateFilmsDistributors,
    setDeleteFilmsDistributors
    
}