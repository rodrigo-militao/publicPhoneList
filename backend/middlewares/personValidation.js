const { validator } = require('cpf-cnpj-validator');
const Joi = require('@hapi/joi').extend(validator);
const rescue = require('express-rescue');
const Boom = require('boom');

module.exports = rescue(async (req, _res, next) => {

  const { type, document } = req.body || {};

  const cnpjSchema = Joi.document().cnpj();
  const cpfSchema = Joi.document().cpf();

  if(type === 'naturalPerson') {
    console.log(cpfSchema.validate(document));
    const response = cpfSchema.validate(document);
    if(response.error)
    return next(Boom.badRequest('CPF inválido'));
  }
  if(type === 'legalPerson') {
    console.log(cnpjSchema.validate(document));
    const response = cnpjSchema.validate(document);
    if(response.error)
    return next(Boom.badRequest('CPF inválido'));
  }

  next()

});
  
