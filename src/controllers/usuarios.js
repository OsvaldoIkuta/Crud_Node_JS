const { Usuario } = require ('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/token');


function cadastro(request, response, next) {
    const { body } = request
    const { nome, email, senha } = body

    const senhaCripto = bcrypt.hashSync(senha, bcrypt.genSaltSync(10))

    Usuario.create({
        nome, email, senhaCripto
    })
        .then( usuario => {
            response.status(201).json(usuario)
        })
        .catch( ex => {
            console.error(ex)
            response.status(412).send('Erro ao cadastrar')
        })


}

function buscaPorId(request, response, next) {
    const { params } = request;
    const  { usuarioId } = params;

    Usuario.findById(usuarioId)
        .then(usuario => {
            if (!usuario) {
                response.status(404).send('Usuario não encontrado');
            }else {
                response.status(200).json(usuario);
            }
        })
        .catch(ex => {
            console.error(ex);
            response.status(412).send('Não foi possivel consultar o usuario')
        })
}

function edicao(request, response, next) {
    const { params, body } = request;
    const  { usuarioId } = params;


    const { nome, email, senha } = body;

    Usuario.findById(usuarioId)
        .then(usuario => {
            if (!usuario) {
                response.status(404).send('Usuario não encontrado');
            }else {
                //response.status(200).json(usuario);
                const senhaCripto = bcrypt.hashSync(senha, bcrypt.genSaltSync(10))
                return usuario.update({
                    nome, email, senhaCripto
                }) .then(() => {
                    response.status(200).json(usuario);
                })
            }
        })
        .catch(ex => {
            console.error(ex);
            response.status(412).send('Não foi possivel atualizar o usuario')
        })
}

function login(request, response, next) {
    const {body} = request

    const {email, senha} = body

    const senhaCripto = bcrypt.hashSync(senha, bcrypt.genSaltSync(10))

    Usuario.findOne({
        where:{
            email,
            senhaCripto
        }
    })
        .then(usuario=>{
            if(usuario !== null){

                const token = generateToken(usuario)
                response.status(200).cookie('token',token).send('Sucesso ao logar')

            }else{

                response.status(401).send('Email/senha está(ão) errado(s) ')

            }
        })
        .catch(ex=>{
            console.error(ex)
            response.status(412).send('Falha do banco de dados')
        })
}

module.exports = {
    cadastro,
    buscaPorId,
    edicao,
    login,
};
