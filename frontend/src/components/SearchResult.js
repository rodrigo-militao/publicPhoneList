import React from 'react';

function SearchResult({ result = {} }) {
  const { _id, name, phone, city, document } = result;
  if (result.message) return <div>Nenhum resultado encontrado.</div>
  return (
    <div>
      <table className="table mt-2">
        <thead>
          <tr>
            <th scope="col">Nome/Razão Social</th>
            <th scope="col">CPF/CNPJ</th>
            <th scope="col">Telefone</th>
            <th scope="col">Cidade</th>
          </tr>
        </thead>
        <tbody>
          
          {
            result &&  
            <tr key={_id}>
              <td>{name}</td>
              <td>{document}</td>
              <td>{phone}</td>
              <td>{city}</td>
            </tr>
          }
          
        </tbody>
      </table>
    </div>
  );
}

export default SearchResult;