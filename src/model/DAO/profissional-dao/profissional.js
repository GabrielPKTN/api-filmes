/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela no MySQL, referente
 * ao profissional
 * Data: 22/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

//Import da dependência do prisma que permite a execução do de script SQL no BD 
const {PrismaClient} = require('../../../generated/prisma') 

//Cria um novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

// Retorna todos os profissionais cadastrados no sistema.
const getSelectAllProfessional = async () => {

try {
 
    sql = "select * from tb_profissional"

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

// Retorna um profissional cadastrado na aplicação pelo id.
const getSelectProfessionalById = async (id) => {

    try {
        
        sql = `select * from tb_profissional where id = ${id}`

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

// Retorna o último profissional cadastrado no sistema.
const getSelectLastProfessional = async () => {

    try {
    
        sql = `select * from tb_profissional order by id desc limit 1`

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

// Registra um profissional no sistema. 
const setInsertProfessional = async (professional) => {

    try {
    
        sql = `INSERT INTO tb_profissional (nome, data_nascimento, foto, biografia) VALUES (
                '${professional.nome}',
                '${professional.data_nascimento}',
                '${professional.foto}',
                '${professional.biografia}'
        )`

        result = prisma.$executeRawUnsafe(sql)

        if(result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Atualiza dados de um profissional no sistema.
const setUpdateProfessionalById = async (id, professional) => {

    try {
        
        sql = `update tb_profissional set

            nome = '${professional.nome}',
            data_nascimento = '${professional.data_nascimento}',
            foto = '${professional.foto}',
            biografia = '${professional.biografia}'
            
            where id = ${id}`

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

// Deleta um profissional do sistema.
const setDeleteProfessionalById = async (id) => {

    try {
    
        sql = `delete from tb_profissional where id = ${id}`

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

    getSelectAllProfessional,
    getSelectProfessionalById,
    getSelectLastProfessional,
    setInsertProfessional,
    setUpdateProfessionalById,
    setDeleteProfessionalById

}