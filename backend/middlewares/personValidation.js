const { validator } = require('cpf-cnpj-validator');
const Joi = require('@hapi/joi').extend(validator);
const rescue = require('express-rescue');
const Boom = require('boom');
const personModel = require('../models/person');

module.exports = rescue(async (req, _res, next) => {

  const { type, document } = req.body || {};

  const cnpjSchema = Joi.document().cnpj();
  const cpfSchema = Joi.document().cpf();

  if(type === 'naturalPerson') {
    const response = cpfSchema.validate(document);
    if(response.error)
    return next(Boom.badRequest('CPF inválido'));
  }
  if(type === 'legalPerson') {
    const response = cnpjSchema.validate(document);
    if(response.error)
    return next(Boom.badRequest('CNPJ inválido'));
  }

  const existentPerson = await personModel.findOne({type, document});
  if(existentPerson) return next(Boom.badRequest('CPF/CNPJ já cadastrado'));
  
  next()

});
  
