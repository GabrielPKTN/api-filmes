/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao cargo
 * Data: 29/10/2025
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

// Retorna todos os cargos
const getSelectAllRole = async () => {

    try {
    
        const sql = "select * from tb_cargo"

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

// Retorna o cargo pelo id
const getSelectRoleById = async (id) => {

    try {
        const sql = `select * from tb_cargo where id = ${id}`

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

// Retorna o último item registrado dentro da tabela cargo
const getSelectLastRole = async () => {

    try {

        const sql = `select * from tb_cargo order by id desc limit 1`

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

// Registra um cargo na tabela
const setInsertRole = async (role) => {

    try {
        
        const sql = `insert into tb_cargo( nome ) values ( '${role.nome}' )`

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

// Atualiza um registro dentro da tabela cargo
const setUpdateRoleById = async (id, role) => {

    try {
        
        const sql = `update tb_cargo set nome = "${role.nome}" where id = ${id}`

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

// Deleta um registro dentro da tabela cargo
const setDeleteRoleById = async (id) => {

    try {
        
        const sql = `delete from tb_cargo where id = ${id}`

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

// getSelectAllRole()
// getSelectRoleById(3)

// id_teste = 5
// role_teste = {
//     "nome": "Best Boy"
// }

// setInsertRole(role_teste)
// getSelectLastRole()
// setUpdateRoleById(id_teste, role_teste)
// setDeleteRoleById(23)

module.exports = {
    getSelectAllRole,
    getSelectRoleById,
    getSelectLastRole,
    setInsertRole,
    setUpdateRoleById,
    setDeleteRoleById
}