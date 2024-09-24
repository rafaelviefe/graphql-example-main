import React, { useState } from 'react';
import { useLazyQuery } from 'react-apollo';
import GetCepData from './graphql/getcep.graphql';

function FormCep() {
  const [cepValue, setCepValue] = useState('');
  const [getCep, { loading, error, data }] = useLazyQuery(GetCepData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCepValue(e.target.value);
  };

  const handleSearch = () => {
    if (cepValue) {
      getCep({ variables: { cep: cepValue } });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <label htmlFor="cep">Qual seu CEP</label>
      <input
        type="text"
        id="cep"
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Detecta se o usuário pressiona "Enter"
        value={cepValue}
        placeholder="Seu CEP"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Carregando...' : 'Puxar CEP'}
      </button>

      {error && <p>Error! {error.message}</p>}

      {/* Renderizando os dados do CEP se o objeto data não for undefined */}
      {data && data.searchCep && (
        <div>
          <h3>Endereço Encontrado:</h3>
          <p><strong>CEP:</strong> {data.searchCep.cep}</p>
          <p><strong>Logradouro:</strong> {data.searchCep.logradouro}</p>
          <p><strong>Bairro:</strong> {data.searchCep.bairro}</p>
        </div>
      )}
    </div>
  );
}

export default FormCep;
