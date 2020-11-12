import React, { useEffect, useState } from 'react';
import { createPerson } from '../services/InsertService';
import { findUFs, findCities } from '../services/localeApi';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import InputMask from 'react-input-mask';

function CreatePerson() {
    const [typeSelected, setTypeSelected] = useState("CPF");
    const [mask, setMask] = useState("");
    const [name, setName] = useState("");
    const [doc, setDoc] = useState("");
    const [UF, setUF] = useState("");
    const [UFList, setUFList] = useState([]);
    const [city, setCity] = useState("");
    const [cityList, setCityList] = useState([]);
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");

    useEffect(() => {
      findUFs().then((data) => setUFList(data));
    }, []);

    useEffect(() => {
      findCities(UF).then((cities) => setCityList(cities));
    }, [UF]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const type = typeSelected === "CPF" ? "naturalPerson" : "legalPerson";
      const response = createPerson(type, name, doc, UF, city, phone, birthDate);
      console.log(response);
      //window.location.href = '/admin';
    }

    return (
    <div className="container mt-4">
      <div onChange={(e) => setTypeSelected(e.target.value)} className="m-4">
        <input type="radio" value="CPF" defaultChecked name="document" className="m-2" /> Pessoa Física
        <input type="radio" value="CNPJ" name="document" className="m-2" /> Pessoa Jurídica
      </div>
      <div>
      <form method="POST" className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col">
            <label htmlFor="name">Informe o Nome</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder={`Informe o Nome`}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
          <label htmlFor="doc">Informe o {typeSelected}</label>
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
              placeholder={`Informe o ${typeSelected}`}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <select className="form-select" id="states" value={UF} onChange={(e) => setUF(e.target.value)}>
            <option value="">UF</option>
              {
                UFList && UFList.map(el => <option key={el.id} value={el.sigla}>{el.sigla}</option>)
              }
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-select" id="cities" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Cidade</option>
              {
                cityList && cityList.map(el => <option key={el.id} value={el.nome}>{el.nome}</option>)
              }
            </select>
          </div>
        </div>
        {typeSelected === "CPF" ? 
          <div className="row mt-3">
            <div className="col">
              <label htmlFor="doc">Data de Nascimento</label>
              <input
                className="form-control"
                type="date"
                name="birthDate"
                id="birthDate"
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate}
                required
              />
            </div>
          </div>
          : ''}
        <div className="row mt-3">
          <div className="col">
            <label htmlFor="phone">Informe o Telefone</label>
            <InputMask
              className="form-control"
              name="phone"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              placeholder={`Informe o Telefone`}
              mask="(99)99999-9999"
            />
          </div>
        </div>
        <div
          id="checkoutFinalizeButton"
          className="d-flex align-items-center justify-content-center mt-5"
        >
          <input
            type="submit"
            value="Salvar"
            className="btn btn-lg btn-danger"
          />
        </div>
      </form>
      </div>
      <a href="/admin">Voltar para a lista de pessoas</a>
    </div>
  );
}

export default CreatePerson;