import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { listOne } from '../services/listService';
import { updatePerson } from '../services/InsertService';
import { findUFs, findCities } from '../services/localeApi';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import InputMask from 'react-input-mask';

function UpdatePerson() {
    const { id } = useParams();
    const [mask, setMask] = useState("");
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [doc, setDoc] = useState("");
    const [UF, setUF] = useState("");
    const [UFList, setUFList] = useState([]);
    const [city, setCity] = useState("");
    const [cityList, setCityList] = useState([]);
    const [phone, setPhone] = useState("");

    useEffect(() => {
      listOne(id).then((data) => {
        setName(data.name);
        setType(data.type);
        setDoc(data.document);
        setUF(data.uf);
        setCity(data.city);
        setPhone(data.phone);
      });

      findUFs().then((data) => setUFList(data));

    }, [id]);

    useEffect(() => {
      findCities(UF).then((cities) => setCityList(cities));
    }, [UF]);

    const handleSubmit = (e) => {
      e.preventDefault();
      updatePerson(id, type, name, doc, UF, city, phone);

      window.location.href = "/admin";
    }

    return (
    <div className="container mt-4">
      <div>
        <input type="radio" value="CPF" readOnly checked={type === "naturalPerson"} name="document" className="m-2" /> Pessoa Física
        <input type="radio" value="CNPJ" readOnly checked={type === "legalPerson"} name="document" className="m-2" /> Pessoa Jurídica
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
            <label htmlFor="doc">Informe o {type === "naturalPerson" ? "CPF" : "CNPJ"}</label>
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
              placeholder={`Informe o ${type === "naturalPerson" ? "CPF" : "CNPJ"}`}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <select className="form-select" id="states" value={UF} onChange={(e) => setUF(e.target.value)}>
              {
                UFList && UFList.map(el => <option key={el.id} value={el.sigla}>{el.sigla}</option>)
              }
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-select" id="cities" value={city} onChange={(e) => setCity(e.target.value)}>
              {
                cityList && cityList.map(el => <option key={el.id} value={el.nome}>{el.nome}</option>)
              }
            </select>
          </div>
        </div>
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
            value="Alterar"
            className="btn btn-lg btn-danger"
          />
        </div>
      </form>
      </div>
      <a href="/admin">Voltar para a lista de pessoas</a>
    </div>
  );
}

export default UpdatePerson;