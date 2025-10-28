/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * a distribuidora
 * Data: 28/10/2025
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

// Retorna todos os registros da tabela distribuidor
const getSelectAllDistributor = async () => {

    try {

        const sql = "select * from tb_distribuidora"

        const result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {

            return result

        } else {

            return false

        }

    } catch (error) {
        return false

    }

}

// Retorna um registro da tabela distribuidor pelo id
const getSelectDistributorById = async (id) => {

    try {

        const sql = `select * from tb_distribuidora where distribuidora_id = ${id}`

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

// Retorna o id registrado na tabela distribuidor 
const getSelectLastDistributor = async () => {

    try {
     
        const sql = "select * from tb_distribuidora order by distribuidora_id desc limit 1"

        const result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {

        return false

    }

}

// Registra um distribuidor na tabela
const setInsertDistributor = async (distributor) => {

    try {
        
        const sql = `insert into tb_distribuidora(nome_distribuidora) values ( '${distributor.nome}' ) `

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

// Atualiza um registro na tabela de distribuidor pelo id
const setUpdateDistributorById = async (id, distributor) => {

    try {

        const sql = `update tb_distribuidora set
                    nome_distribuidora  =   '${distributor.nome}'
                    where distribuidora_id = ${id}`

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

// Deleta um registro da tabela de distribuidor pelo id
const setDeleteDistributor = async (id) => {

    try {
        
        const sql = `delete from tb_distribuidora where distribuidora_id = ${id}`

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
    getSelectAllDistributor,
    getSelectDistributorById,
    getSelectLastDistributor,
    setInsertDistributor,
    setUpdateDistributorById,
    setDeleteDistributor
}