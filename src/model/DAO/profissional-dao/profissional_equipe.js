/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao relacionamento entre profissional, e equipe.
 * Data: 16/12/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

//Import da dependência do prisma que permite a execução do de script SQL no BD 
const {PrismaClient} = require('../../../generated/prisma') 

//Cria um novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

// Retorna todas as relações entre profissional e equipe.
const getSelectProfessionalTeams = async () => {

    try {
        
        sql = "select * from tb_profissional_equipe"

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

// Retorna uma relação entre profissional e equipe pelo id.
const getSelectProfessionalTeamById = async (id) => {

    try {

        sql = `select * from tb_profissional_equipe where id = ${id}`

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

// Retorna todos os profissionais com id de equipe da pesquisa.
const getSelectProfessionalsByTeamId = async (team_id) => {

    try {
        
        sql = `
                SELECT 
                    tb_profissional.id,
                    tb_profissional.nome,
                    tb_profissional.data_nascimento,
                    tb_profissional.foto,
                    tb_profissional.biografia
                    
                    FROM tb_profissional JOIN
                    tb_profissional_equipe ON
                        tb_profissional.id = tb_profissional_equipe.id_profissional
                    
                    JOIN
                    tb_equipe_tecnica ON
                        tb_equipe_tecnica.id = tb_profissional_equipe.id_equipe_tecnica
                        
                    WHERE tb_equipe_tecnica.id = ${team_id}`

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

// Retorna todos as equipes que determinado profissional participa.
const getSelectTeamIdByProfessionalId = async (team_id) => {

    try {
        
        sql = `
                SELECT 
                    tb_equipe_tecnica.id
                    
                    FROM tb_equipe_tecnica JOIN
                    tb_profissional_equipe ON
                        tb_equipe_tecnica.id = tb_profissional_equipe.id_equipe_tecnica
                    
                    JOIN
                    tb_profissional ON
                        tb_profissional.id = tb_profissional_equipe.id_profissional
                        
                    WHERE tb_profissional.id = ${team_id}`

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
const getSelectLastTeamProfessional = async () => {

    try {
        
        sql = `select * from tb_profissional_equipe order by id desc limit 1`

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

// Insere uma relação entre o profissional e determinada equipe.
const setInsertProfessionalTeam = async (professional_team) => {

    try {
        
        sql = `insert into tb_profissional_equipe(
                    id_profissional, 
                    id_equipe_tecnica
                    ) 
                    values
                    (${professional_team.id_profissional},
                     ${professional_team.id_equipe})`

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
const setUpdateProfessionalTeam = async (id, professional_team) => {

    try {
        
        sql = `update tb_profissional_equipe set
                    id_profissional = ${professional_team.id_profissional},
                    id_equipe_tecnica = ${professional_team.id_equipe}
                    
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

// Deleta uma relação entre um profissional e determinada Equipe.
const setDeleteProfessionalTeamById = async (id) => {

    try {
        
        sql = `delete from tb_profissional_equipe where id = ${id}`

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
    getSelectProfessionalTeams,
    getSelectProfessionalTeamById,
    getSelectProfessionalsByTeamId,
    getSelectTeamIdByProfessionalId,
    getSelectLastTeamProfessional,
    setInsertProfessionalTeam,
    setUpdateProfessionalTeam,
    setDeleteProfessionalTeamById

}
