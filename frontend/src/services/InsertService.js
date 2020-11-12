const deletePerson = async (id) => {
  const deletedPerson = await fetch(`http://localhost:3001/person/${id}`, {
    method: 'DELETE',
  });

  return deletedPerson;
};

const createPerson = async (type, name, doc, uf, city, phone, birthDate) => {
  const newPerson = await ( await fetch('http://localhost:3001/person', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type,
      name,
      uf,
      city,
      document: doc,
      phone,
      birthDate,
    }),
  }) ).json();

  return newPerson;
};

const updatePerson = async (id, type,  name, doc, uf, city, phone) => {
  const updatedPerson = await ( await fetch('http://localhost:3001/person', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      type,
      name,
      uf,
      city,
      document: doc,
      phone,
    }),
  }) ).json();

  return updatedPerson;
};

module.exports = {
  deletePerson,
  createPerson,
  updatePerson,
};