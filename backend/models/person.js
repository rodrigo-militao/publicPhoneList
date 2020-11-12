const { ObjectID } = require('mongodb');
const { connectTo, addGeneral } = require('./connection');

const create = addGeneral('person');

const findAll = async (page) => connectTo('person').then((table) => 
  table.find({})
  .skip((page - 1) * 5)
  .limit(5)
  .toArray());

const getCount = async() => connectTo('person').then((table) => table.find({}).count());

const findOne = async (searchObj) =>
  connectTo('person').then((table) => table.findOne(searchObj));

const update = async (id, newPerson) =>
  connectTo('person')
    .then((table) =>
      table.updateOne({ _id: ObjectID(id) }, { $set: newPerson }))
    .then(() => newPerson);

const remove = async (id) => connectTo('person')
  .then((table) => table.deleteOne({ _id: ObjectID(id) }));

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
  getCount,
};
