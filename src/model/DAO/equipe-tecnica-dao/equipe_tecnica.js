/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * a equipe tecnica
 * Data: 23/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

//Import da dependência do prisma que permite a execução do de script SQL no BD 
const {PrismaClient} = require('../../../generated/prisma') 

//Cria um novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

// Retorna todas as relações entre profissional e cargo.
const getSelectTeam = async () => {

    try {
        
        sql = "select * from tb_equipe_tecnica"

        result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Retorna uma relação entre profissional e cargo pelo id.
const getSelectTeamById = async (id) => {

    try {

        sql = `select * from tb_equipe_tecnica where id = ${id}`

        result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false   
    }

}

// Retorna a última relação inserida no sistema.
const getSelectLastTeam = async () => {

    try {
        
        sql = `select * from tb_equipe_tecnica order by id desc limit 1`

        result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Insere uma relação entre o profissional e determinado cargo.
const setInsertTeam = async (team) => {

    try {
        
        sql = `insert into tb_equipe_tecnica(id_filme) values (${team.id_filme})`

        result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return result 
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Atualiza uma relação entre profissional e determinado cargo.
const setUpdateTeam = async (id, team) => {

    try {
        
        sql = `update tb_equipe_tecnica set
                    id_filme = ${team.id_filme}
                    
                    where id = ${id}`

        result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Deleta uma relação entre um profissional e determinado cargo.
const setDeleteTeamById = async (id) => {

    try {
        
        sql = `delete from tb_equipe_tecnica where id = ${id}`

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

module.exports = {

    getSelectTeam,
    getSelectTeamById,
    getSelectLastTeam,
    setInsertTeam,
    setUpdateTeam,
    setDeleteTeamById

}