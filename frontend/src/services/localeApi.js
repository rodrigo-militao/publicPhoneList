const findUFs = async () => {
    const states = await ( await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados') ).json();

    return states;
}

const findCities = async (uf) => {
    const cities =  await ( await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`) ).json();

    return cities;
}

module.exports = { findUFs, findCities };