import * as React from 'react';
import './style.css';
import axios from 'axios';
import { useState } from 'react';

function buscardados(user) {
  const url = `api.github.com/users/${user}`;
  const resultado = axios.get(url);
  return resultado;
}

export default function App() {
  const [nome, setNome] = useState('');

  buscardados('mathiasgheno').then((resultado) => {
    const nome = resultado.data.name;
    setNome(nome);
    console.log(nome);
  });
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
