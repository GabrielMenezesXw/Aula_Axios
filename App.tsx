import * as React from 'react';
import './style.css';
import axios from 'axios';

function buscardados(user) {
  const url = `api.github.com/users/${user}`;
  const resultado = axios.get(url);
  return resultado;
}

export default function App() {
  buscardados('mathiasgheno').then((resultado) => {
    console.log(resultado);
  });
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
