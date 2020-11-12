const { ObjectID } = require('mongodb');
const person = require('../models/person');

const addPerson = ({ type, name, document, uf, birthDate, city, phone }) =>
person.create({ type, name, document, uf, birthDate, city, phone });

const updatePerson = async ({ id, type, name, document, uf, birthDate, city, phone }) =>
person.update(id, { type, name, document, uf, birthDate, city, phone });

const deletePerson = async (id) => person.remove(id);

const findAllPerson = async (page) => person.findAll(page);

const getCount = async () => person.getCount();

const findOneById = async (id) => person.findOne({ _id: ObjectID(id) });

const searchList = async (type, document, uf, city) => person.findOne({ type, document, uf, city });

module.exports = {
  addPerson,
  updatePerson,
  deletePerson,
  findAllPerson,
  findOneById,
  searchList,
  getCount,
};