import React from 'react';
import { deletePerson } from '../services/InsertService';

function ListTable({ list = [] }) {
  const handleDelete = (id) => {
    deletePerson(id);

    window.location.href = '/admin';
  }
  
  if(list.length === 0) return <div className="m-5">Nenhuma pessoa cadastrada.</div>
  return (
    <table className="table mt-2">
    <thead>
      <tr>
        <th scope="col">Tipo</th>
        <th scope="col">Nome/Razão Social</th>
        <th scope="col">CPF/CNPJ</th>
        <th scope="col">Telefone</th>
        <th scope="col">Cidade</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      
      {
        list && list.map(({ _id, name, phone, city, document, type }) =>  
        <tr key={_id}>
          <th>{type === "naturalPerson" ? "Pessoa Física" : "Pessoa Jurídica"}</th>
          <td>{name}</td>
          <td>{document}</td>
          <td>{phone}</td>
          <td>{city}</td>
          <td>
            <a href={`/edit/${_id}`} className="m-1"><i className="fas fa-user-edit"></i></a>
            <a href="#" onClick={() => handleDelete(_id)} className="m-1">
              <i className="fas fa-trash-alt"></i>
            </a>
          </td>
        </tr>
        )
      }
      
    </tbody>
  </table>
  );
}

export default ListTable;