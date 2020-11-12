import React, { useState, useEffect } from 'react';
import { findUFs, findCities } from '../services/localeApi';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

function SearchForm({ selected = "", onSubmit }) {
  const [doc, setDoc] = useState('');
  const [UF, setUF] = useState('');
  const [UFList, setUFList] = useState([]);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);
  const [mask, setMask] = useState("");


  useEffect(() => {
    findUFs().then((data) => setUFList(data));
  }, []);

  useEffect(() => {
    findCities(UF).then((cities) => setCityList(cities));
  }, [UF]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const type = selected === "CPF" ? "naturalPerson" : "legalPerson";
    onSubmit(type, doc, UF, city);
  }

  return (
    <div>
      <form method="POST" className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-10">
            <label htmlFor="name">Informe o {selected}</label>
            <CpfCnpj
              className="form-control"
              name="doc"
              id="doc"
              onChange={(e, type) => {
                setDoc(e.target.value);
                setMask(type === "CPF")
              }}
              value={doc}
              required
              placeholder={`Informe o ${selected}`}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-5">
            <select className="form-select" id="states" value={UF} onChange={(e) => setUF(e.target.value)}>
              <option value="">UF</option>
              {
                UFList && UFList.map(el => <option key={el.id} value={el.sigla}>{el.sigla}</option>)
              }
            </select>
          </div>
          <div className="col-md-5">
            <select className="form-select" id="cities" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Cidade</option>
              {
                cityList && cityList.map(el => <option key={el.id} value={el.nome}>{el.nome}</option>)
              }
            </select>
          </div>
        </div>
        <div
          id="checkoutFinalizeButton"
          className="mt-5 col-md-10"
        >
          <input
            type="submit"
            value="BUSCAR"
            className="btn btn-lg btn-danger btn-block"
          />
        </div>
      </form>
    </div>  
  );
}

export default SearchForm;