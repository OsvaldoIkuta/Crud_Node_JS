const express = require('express');
const router = express.Router();

const validateSchema = require('./validateSchema');
const controller = require('../controllers/usuarios');
const { authenticationMiddleware } = require('../utils/token');

/*******
 * TODO: Definição das rotas do CRUD de Usuários e Login.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   validateSchema(validateBody),
 *   controller.cadastro
 * );
 *******/

const validateBody = {
    nome: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Nome inválido, por favor informe novamente!"
    },
    email: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Email inválido, por favor informe novamente!"
    },
    senha: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Senha inválida, por favor informe novamente!"
    }
}

//Cadastra usuário
router.post('/', authenticationMiddleware, validateSchema(validateBody), controller.cadastro)

//Busca um usuário por id
router.get('/:usuarioId', authenticationMiddleware, controller.buscaPorId)

//Edição de um usuário
router.put('/:usuarioId', authenticationMiddleware, validateSchema(validateBody),  controller.edicao)

//login do usuário
router.post('/login', authenticationMiddleware, controller.login)

module.exports = router;
