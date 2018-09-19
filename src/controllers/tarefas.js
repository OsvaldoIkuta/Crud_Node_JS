const Sequelize = require('sequelize');

//Importações Internas
const { Tarefa } = require('../models');

function cadastro(request, response, next) {
    const {body, usuarioLogado } = request

    const {titulo, descricao} = body

    const {id} = usuarioLogado

    Tarefa.create({
        titulo, descricao, usuarioId:id
    })
        .then( tarefa => {
            response.status(201).json(tarefa)
        })
        .catch( ex => {
            console.error(ex);
            response.status(412).send('Falha ao cadastrar uma tarefe')
        })
}

function listagem(request, response, next) {
    const {usuarioLogado} = request

    Tarefa.findAll({
        where: {
            usuarioId: id
        }
    }).then(tarefa => {
        if(!tarefa){
            response.status(404).send('Nenhuma tarefa encontrada')
        }else{
            response.status(200).json(tarefa)
        }
    })
        .catch(ex=>{
            console.error(ex)
            response.status(412).send('Falha no banco de dados')

        })

}

function buscaPorId(request, response, next) {
    const { params } = request

    const { tarefaId } = params

    Tarefa.findById(tarefaId)
        .then(tarefa => {
            if (!tarefa){
                response.status(404).send('Tarefa não encontrada')
            }else{
                response.status(200).json(tarefa)
            }
        })
        .catch(ex=>{
            console.error(ex)
            response.status(412).send('Falha no banco de dados')
        })

}

function edicao(request, response, next) {
    const {params, body } = request
    const { tarefaId } = params
    const { titulo, descricao } = body

    Tarefa.findById(tarefaId)
        .then( tarefa => {
            if (!tarefa){
                response.status(404).send('Tarefa não encontrada')
            }else{
                return tarefa.update({
                    titulo, descricao
                })
                    .then(()=>{
                        response.status(200).json(tarefa)
                    })
            }
        })
        .catch(ex=>{
            console.error(ex)
            response.status(412).send('Falha no banco de dados')
        })

}

function remocao(request, response, next) {
    const { params } = request
    const { tarefaId } = params

    Tarefa.destroy({
        where: {
            id: tarefaId
        }
    })
        .then( deletados => {
            if(deletados > 0)
            {
                response.status(204).send()
            }
            else
            {
                response.status(404).send('Tarefa não encontrada')
            }
        })
        .catch(ex => {
            console.error(ex)
            response.status(412).send('Falha no banco de dados')
        })
}

function marcarConcluida(request, response, next) {
    const { params } = request
    const { tarefaId } = params

    Tarefa.findById(tarefaId)
        .then( tarefa => {
            if (!tarefa){
                response.status(404).send('Tarefa não encontrada')
            }else{
                return tarefa.update({
                    concluida: 1
                })
                    .then(()=>{
                        response.status(200).json(tarefa)
                    })
            }
        })
        .catch(ex=>{
            console.error(ex)
            response.status(412).send('Falha no banco de dados')
        })
}

function desmarcarConcluida(request, response, next) {
    const { params } = request
    const { tarefaId } = params

    Tarefa.findById(tarefaId)
        .then( tarefa => {
            if (!tarefa){
                response.status(404).send('Tarefa não encontrada')
            }else{
                return tarefa.update({
                    concluida: 0
                })
                    .then(()=>{
                        response.status(200).json(tarefa)
                    })
            }
        })
        .catch(ex=>{
            console.error(ex)
            response.status(412).send('Falha no banco de dados')
        })
}

module.exports = {
    cadastro,
    listagem,
    buscaPorId,
    edicao,
    remocao,
    marcarConcluida,
    desmarcarConcluida,
};
