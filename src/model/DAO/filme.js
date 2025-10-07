/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL, referente
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

// Retorna uma lista de todos os filmes do banco de dados
const getSelectAllFilms = async () => {

    try {
       
        // Script SQL
        let sql = `select * from tb_filme order by id desc`

        // Encaminha o script para o banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        let verify = result.length > 0 ? result : false

        return verify
    
    } catch (error) {

        return false

    }
    

}

// Retorna um filme filtrando pelo id do banco de dados
const getSelectByIdFilms = async (id) => {

} 

// Insere um filme novo no banco de dados
const setInsertFilms = async () => {

}

// Altere um filme no banco de dados
const setUpdateFilms = async () => {

}

// Exclui um filme pelo id no banco de dados
const setDeleteFilms = async (id) => {

}

module.exports = {
    getSelectAllFilms
}