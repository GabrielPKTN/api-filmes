/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao filme
 * Data: 01/10/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

/*********************************************************************
 *  Exemplos de dependências para conexão com o BD
 * 
 *      Banco de dados relacional:
 * 
 *          Sequelize -> Foi utilizado em muitos projetos desde o início 
 *          do node
 * 
 *          Prisma    -> É uma dependência atual que trabalha com BD (SQL ou ORM)
 *              npm install prisma --save           -> instalar o prisma (conexão com o database)
 *              npm install @prisma/client --save   -> instalar o cliente do prisma (executar scripts SQL no DB)
 *              npx prisma init                     -> Prompt de comando para inicializar o prisma
 *              npx prisma migrate dev              -> Realiza o sincronismo entre o prisma e o BD (CUIDADO, 
 *                                                     durante esse processo você pode perder dados reais, pois
 *                                                     ele pega e cria as tabelas programadas no ORM schema.prisma)
 *              npx prisma generate                 -> Apenas realiza o sincronismo entre o prisma e o banco de dados,
 *                                                     geralmente usamos para rodar o projeto em um PC novo
 *          
 *          Knex      -> É uma depêndencia atual que trabalha com MySQL
 *      
 *      Banco de dados não relacional:
 *          
 *          Mongoose  -> É uma dependência para o Mongo DB (Não relacional)
 * 
 ********************************************************************/

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

// Retorna uma lista de todos os filmes do banco de dados
const getSelectAllFilms = async () => {

    try {
       
        // Script SQL
        let sql = `select * from tb_filmes order by filme_id desc`

        // Encaminha o script para o banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    
    } catch (error) {

        return false

    }
    

}

// Retorna um filme filtrando pelo id do banco de dados
const getSelectByIdFilms = async (id) => {

    try {
       
        // Script SQL
        let sql = `select * from tb_filmes where filme_id=${id}`

        // Encaminha o script para o banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    
    } catch (error) {

        return false

    }

} 

// Retorna o último filme adicionado na tabela 
const getSelectLastId = async () => {
    try {
        // script SQL para retornar apenas o último id do BD
        let sql = `select filme_id from tb_filmes order by filme_id desc limit 1`
        
        // resultado do script sql
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return Number(result[0].filme_id)
        } else {
            return false
        }

    } catch (error) {
        return false

    }
}

// Insere um filme novo no banco de dados
const setInsertFilms = async (filme) => {

    try {
        
        let sql = `INSERT INTO tb_filmes (nome, sinopse, data_lancamento, 
						duracao, orcamento, trailer, capa)
                    VALUES (
                        '${filme.nome}',
                        '${filme.sinopse}',
                        '${filme.data_lancamento}',
                        '${filme.duracao}',
                        '${filme.orcamento}',
                        '${filme.trailer}',
                        '${filme.capa}'
                    )`

        // $executeRawUnsafe() -> executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        
        } else {    
            return false
        } 
            

    } catch (error) {
        return false
    }


}

// Altere um filme no banco de dados
const setUpdateFilms = async (filme) => {

    try {
        let sql = `update tb_filmes set
                nome                ='${filme.nome}',
                sinopse             ='${filme.sinopse}',
                data_lancamento     ='${filme.data_lancamento}',
                duracao             ='${filme.duracao}',
                orcamento           ='${filme.orcamento}',
                trailer             ='${filme.trailer}',
                capa                ='${filme.capa}'
                
                where filme_id = ${filme.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

// Exclui um filme pelo id no banco de dados
const setDeleteFilms = async (id) => {

    try {
        
        let sql = `delete from tb_filmes where filme_id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
    
}

module.exports = {
    getSelectAllFilms,
    getSelectByIdFilms,
    getSelectLastId,
    setInsertFilms,
    setUpdateFilms,
    setDeleteFilms
}