/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao papel
 * Data: 04/11/2025
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

// Retorna todos os idiomas
const getSelectAllLanguage = async () => {

    try {
    
        const sql = "select * from tb_idioma_dublagem"

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

// Retorna o idioma pelo id
const getSelectLanguageById = async (id) => {

    try {
        const sql = `select * from tb_idioma_dublagem where idioma_dublagem_id = ${id}`

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

// Retorna o último item registrado dentro da tabela idioma
const getSelectLastLanguage = async () => {

    try {

        const sql = `select * from tb_idioma_dublagem order by idioma_dublagem_id desc limit 1`

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

// Registra um idioma na tabela
const setInsertLanguage = async (language) => {

    try {
        
        const sql = `insert into tb_idioma_dublagem( idioma_dublador ) values ( '${language.nome}' )`

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

// Atualiza um registro dentro da tabela idioma
const setUpdateLanguageById = async (id, language) => {

    try {
        
        const sql = `update tb_idioma_dublagem set idioma_dublador = "${language.nome}" where idioma_dublagem_id = ${id}`

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

// Deleta um registro dentro da tabela idioma
const setDeleteLanguageById = async (id) => {

    try {
        
        const sql = `delete from tb_idioma_dublagem where idioma_dublagem_id = ${id}`

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
    getSelectAllLanguage,
    getSelectLastLanguage,
    getSelectLanguageById,
    setInsertLanguage,
    setUpdateLanguageById,
    setDeleteLanguageById
}