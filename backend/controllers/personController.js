const express = require('express');
const rescue = require('express-rescue');
const Boom = require('boom');

const personService = require('../services/personService');
const validator = require('../middlewares/personValidation');

const personRouter = express.Router();

const createPerson = rescue(async (req, res) => {
  const { type, name, document, uf, city, birthDate, phone } = req.body || {};

  const newPerson = await personService.addPerson({ type, name, document, uf, city, birthDate, phone });
  return res.status(201).json({ newPerson });
});

const updatePerson = rescue(async (req, res) => {
  const {
    body: { id, type, name, document, uf, city, birthDate, phone },
  } = req || {};

  const newPerson = await personService.updatePerson({ id, type, name, document, uf, city, birthDate, phone });

  res.status(200).json(newPerson);
});

const deletePerson = rescue(async (req, res) =>
personService.deletePerson(req.params.id).then(() => res.status(204).end()));

const findAllPerson = rescue(async (req, res) => {
  const { pageNumber } = req.params;

  const personList = await personService.findAllPerson(pageNumber);
  return res.status(200).json(personList);

});

const getCount = rescue(async (req, res) => {
  const count = await personService.getCount();

  return res.status(200).json(count);
});

const findOnePerson = rescue(async (req, res) => {
  const { id } = req.params;
  const naturalPerson = await personService.findOneById(id);

  if (!naturalPerson) return next(Boom.notFound('person not found'));

  res.status(200).json(naturalPerson);
});

const searchPerson = rescue(async (req, res, next) => {
  const { type, document, uf, city } = req.body;

  const naturalPerson = await personService.searchList(type, document, uf, city);

  if (!naturalPerson) return next(Boom.notFound('person not found'));

  res.status(200).json(naturalPerson);
});

personRouter
  .route('/')
  .get(getCount)
  .post(validator, createPerson)
  .put(validator, updatePerson)

personRouter
  .route('/page/:pageNumber')
  .get(findAllPerson)

personRouter
  .route('/:id')
  .get(findOnePerson)
  .delete(deletePerson);

personRouter
  .route('/search')
  .post(searchPerson);

module.exports = personRouter;