import React, { useState, useEffect } from 'react';
import { listAll } from '../services/listService';
import LisTable from '../components/ListTable';
import PaginationComponent from '../components/PaginationComponent';

function AdminPage() {
  const [list, setList] = useState([]);
  const [listCount, setListCount] = useState(0);

  useEffect(() => {
    listAll().then((data) => {
      setList(data.filteredList)
      setListCount(data.count)
    });
  }, []);

  const onPageChange = (currentPage) => {
    listAll(currentPage).then((data) => {
      setList(data.filteredList)
    });
  }
  return (
    <div className="container">
      <div className="row">
        <h2>Gerenciando Pessoas Físicas e Jurídicas</h2>
      </div>
      <div className="row mt-4">
        <div className="col">
          <h4>Lista de Pessoas</h4>
        </div>
        <div className="col">
          <a href="/new">Criar Nova Pessoa</a>
        </div>
      </div>

      <LisTable list={list} />

      <PaginationComponent listCount={listCount} list={list} onPageChange={(currentPage, numberOfPages) => onPageChange(currentPage, numberOfPages)} />

      <div className="row mt-4">
        <a href="/">Voltar à Tela de Pesquisa de Telefone</a>
      </div>  
    </div>
  );
}

export default AdminPage;