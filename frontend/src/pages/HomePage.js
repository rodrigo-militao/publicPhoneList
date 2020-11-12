import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import SearchResultList from '../components/SearchResult';
import { search } from '../services/listService';

function HomePage() {
  const [typeSelected, setTypeSelected] = useState("CPF");
  const [searchResult, setSearchResult] = useState(null);
  const handleSubmit = (selected, doc, UF, city) => {
    search(selected, doc, UF, city).then((result) => setSearchResult(result));
  }
  return (
    <div className="container">
        <h2>Lista pública de telefone</h2>
        <h4>Selecione o tipo de busca e informe os dados para encontrar o número de telefone</h4>

        <div onChange={(e) => setTypeSelected(e.target.value)} className="mt-4 mb-4">
          <input type="radio" value="CPF" defaultChecked name="document" className="m-2" /> Pessoa Física
          <input type="radio" value="CNPJ" name="document" className="m-2" /> Pessoa Jurídica
        </div>

        <div className="row">
          <div className="col">
            <SearchForm selected={typeSelected} onSubmit={ (selected, doc, UF, city) => handleSubmit(selected, doc, UF, city) } />
          </div>
          <div className="col">
            { searchResult && <SearchResultList result={searchResult} /> }
          </div>
        </div>


        <div className="mt-5">
          <a href="/admin">Gerenciar Pessoa</a>
        </div>
    </div>
  );
}

export default HomePage;