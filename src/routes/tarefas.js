const express = require('express');
const router = express.Router();

const { authenticationMiddleware } = require('../utils/token');
const validateSchema = require('./validateSchema');
const controller = require('../controllers/tarefas');

/*******
 * TODO: Definição das rotas do CRUD de Tarefas.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   validateSchema(validateBody),
 *   authenticationMiddleware,
 *   controller.cadastro,
 * );
 *******/

const validateBody = {
    titulo: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Titulo inválido, por favor informe novamente!"
    },
    descricao: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Descrição inválida, por favor informe novamente!"
    }
}

//Listar todas as tarefas
router.get('/', authenticationMiddleware, controller.listagem);

//Cadastrar uma nova tarefa
router.post('/', authenticationMiddleware, validateSchema(validateBody), controller.cadastro);

//Buscar uma tarefa por ID
router.get('/:tarefaId', authenticationMiddleware, controller.buscaPorId);

//Editar uma tarefa
router.put('/:tarefaId', authenticationMiddleware, validateSchema(validateBody), controller.edicao);

//Deletar uma tarefa
router.delete('/:tarefaId', authenticationMiddleware, controller.remocao);

//Marcar uma tarefa como concluída
router.put('/:tarefaId/concluida', authenticationMiddleware, controller.marcarConcluida);

//Desmarcar uma tarefa concluída
router.delete('/:tarefaId/concluida', authenticationMiddleware, controller.desmarcarConcluida);

module.exports = router;
