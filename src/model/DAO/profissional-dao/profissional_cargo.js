/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao relacionamento entre profissional, e cargo.
 * Data: 22/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

//Import da dependência do prisma que permite a execução do de script SQL no BD 
const {PrismaClient} = require('../../../generated/prisma') 

//Cria um novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

// Retorna todas as relações entre profissional e cargo.
const getSelectProfessionalsRoles = async () => {

    try {
        
        sql = "select * from tb_profissional_cargo"

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
const getSelectProfessionalsRolesById = async (id) => {

    try {

        sql = `select * from tb_profissional_cargo where id = ${id}`

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

// Retorna todos os profissionais com id de cargo da pesquisa.
const getSelectProfessionalsByRoleId = async (role_id) => {

    try {
        
        sql = `select
                tb_profissional.id,
                tb_profissional.nome
                
                from tb_profissional_cargo
                join tb_profissional
                    on tb_profissional.id = tb_profissional_cargo.id_profissional
                
                join tb_cargo
                    on tb_cargo.id = tb_profissional_cargo.id_cargo
                    
                    where tb_cargo.id = ${role_id}`

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

// Retorna todos os cargos que determinado profissional desempenha ou desempenhou.
const getSelectRolesByProfessionalId = async (professional_id) => {

    try {
        
        sql = `select
                    tb_cargo.id,
                    tb_cargo.nome as cargo
                    
                    from tb_profissional_cargo
                    join tb_profissional
                        on tb_profissional.id = tb_profissional_cargo.id_profissional
                    
                    join tb_cargo
                        on tb_cargo.id = tb_profissional_cargo.id_cargo
                        
                        where tb_profissional.id = ${professional_id}`

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
const getSelectLastRoleProfessional = async () => {

    try {
        
        sql = `select * from tb_profissional_cargo order by id desc limit 1`

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
const setInsertProfessionalRole = async (professional_role) => {

    try {
        
        sql = `insert into tb_profissional_cargo(
                    id_profissional, 
                    id_cargo
                    ) 
                    values
                    (${professional_role.id_profissional},
                     ${professional_role.id_cargo})`

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
const setUpdateProfessionalRole = async (id, professional_role) => {

    try {
        
        sql = `update tb_profissional_cargo set
                    id_profissional = ${professional_role.id_profissional},
                    id_cargo = ${professional_role.id_cargo}
                    
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
const setDeleteProfessionalRoleById = async (id) => {

    try {
        
        sql = `delete from tb_profissional_cargo where id = ${id}`

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

    getSelectProfessionalsRoles,
    getSelectProfessionalsRolesById,
    getSelectProfessionalsByRoleId,
    getSelectRolesByProfessionalId,
    getSelectLastRoleProfessional,
    setInsertProfessionalRole,
    setUpdateProfessionalRole,
    setDeleteProfessionalRoleById

}
