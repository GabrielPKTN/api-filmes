/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao estudio
 * Data: 03/11/2025
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

// Retorna todos os estudios
const getSelectAllStudio = async () => {

    try {
    
        const sql = "select * from tb_estudio"

        const result = await prisma.$queryRawUnsafe(sql)
        

        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }    

}

// Retorna o estudio pelo id
const getSelectStudioById = async (id) => {

    try {
        const sql = `select * from tb_estudio where estudio_id = ${id}`

        const result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Retorna o último item registrado dentro da tabela estudio
const getSelectLastStudio = async () => {

    try {

        const sql = `select * from tb_estudio order by estudio_id desc limit 1`

        const result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Registra um estudios na tabela
const setInsertStudio = async (studio) => {

    try {
        
        const sql = `insert into tb_estudio( nome_estudio ) values ( '${studio.nome}' )`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Atualiza um registro dentro da tabela estudio
const setUpdateStudioById = async (id, studio) => {

    try {
        
        const sql = `update tb_estudio set nome_estudio = "${studio.nome}" where estudio_id = ${id}`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Deleta um registro dentro da tabela estudio
const setDeleteStudioById = async (id) => {

    try {
        
        const sql = `delete from tb_estudio where estudio_id = ${id}`

        const result = await prisma.$executeRawUnsafe(sql)

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
    getSelectAllStudio,
    getSelectLastStudio,
    getSelectStudioById,
    setInsertStudio,
    setUpdateStudioById,
    setDeleteStudioById
}