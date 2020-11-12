const listAll = async (page = 1) => {
    const pageableList =  await ( await fetch(`http://localhost:3001/person/page/${page}`) ).json();
    const count = await ( await fetch(`http://localhost:3001/person`) ).json();
    return {
      count,
      filteredList: pageableList,
    };
};

const listOne = async (id) => {
    return await ( await fetch(`http://localhost:3001/person/${id}`) ).json();
};

const search = async (type, doc, uf, city) => {
  return await ( await fetch('http://localhost:3001/person/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type,
      uf,
      city,
      document: doc,
    }),
    }) ).json();
}

module.exports = {
  listAll,
  listOne,
  search,
};