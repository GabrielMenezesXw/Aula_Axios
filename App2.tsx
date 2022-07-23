import "./style.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export default function Consulta() {
  const [tarefas, setTarefas] = useState(["conteudo"]);
  const [inputTarefa, setInputTarefa] = useState("");

  const handleOnSubmit = (e) => e.preventDefault();
  const adcionarTarefa = (dto) => {
    const novoArray = tarefas;
    novoArray.push(dto);
    setTarefas([...novoArray]);
    setInputTarefa("");
  };

  const buscarTarefasGabriel = async () => {
    const url = "https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks/";
    const resultado = await axios.get(url, {
      params: { user: "Gabriel" }
    });
    return resultado.data.items;
  };

  useEffect(() => {
    buscarTarefasGabriel().then((retornoTarefas) => {
      setTarefas(retornoTarefas);
    });
  }, []);

  const handleOnClickExclude = async (id) => {
    const url = `https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks/${id}`;
    await axios.delete(url);
    buscarTarefasGabriel().then((retornoTarefas) => {
      setTarefas(retornoTarefas);
    });
  };

  const handleOnClickpatch = async (id) => {
    const url = `https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks/${id}`;
    const dto = {
      description: inputTarefa,
      user: "Gabriel"
    };
    const resultado = await axios.put(url, dto);
    const tarefaAtualizada = resultado.data.Item;
    adcionarTarefa(tarefaAtualizada);
  };

  const handleOnClickAdd = async () => {
    const url = "https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks/";
    const dto = {
      description: inputTarefa,
      user: "Gabriel"
    };
    const resultado = await axios.post(url, dto);
    const tarefaAdicionada = resultado.data.Item;
    adcionarTarefa(tarefaAdicionada);
  };

  return (
    <div className="container">
      <div className="conteudo">
        <h1 className="titulo">Tarefas</h1>
        <div>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="tarefa_box">
              <label htmlFor="tarefa">Tarefa</label>
              <div
                style={{
                  display: "flex",
                  gap: 10
                }}
              >
                <input
                  id="tarefa"
                  name="tarefa"
                  value={inputTarefa}
                  onChange={(e) => setInputTarefa(e.target.value)}
                  placeholder="tarefa generica"
                />
                <button
                  className="btn botao_adcionar"
                  onClick={() => handleOnClickAdd()}
                >
                  adcionar
                </button>
              </div>
            </div>
          </form>
          <section>
            <ul>
              {tarefas.map((tarefa) => (
                <li>
                  <input
                    className="tarefa_conteudo"
                    value={tarefa.description}
                  />
                  <button
                    className="btn botao_excluir"
                    onClick={() => handleOnClickExclude(tarefa.id)}
                  >
                    Excluir
                  </button>
                  <button
                    className="btn botao_atualizar"
                    onClick={() => handleOnClickpatch(tarefa.id)}
                  >
                    Atualizar
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
