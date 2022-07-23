import * as React from "react";
import "./style.css";
import axios from "axios";
import { useState } from "react";

const url = "https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks/";

async function buscarTodasTarefas() {
  const resultado = await axios.get(url);
  return resultado.data;
}

let resultado;

async function buscarPorUsuario(user) {
  const configs = {
    params: {
      user: user
    }
  };
  const resultado = await axios.get(url, configs);
  return resultado.data;
}

async function inserirTarefa(user, description) {
  const DTO = {
    user: user,
    description: description
  };

  const resultado = await axios.post(url, DTO);
  return resultado.data;
}

async function alterarTarefa(id, user, description) {
  const dto = {
    user: user,
    description: description
  };

  const alterar = await axios.put(`${url}${id}`, dto);
  return alterar.data;
}

async function deletarTarefa(id) {
  const deletar = await axios.delete(`${url}${id}`);
  return deletar.data;
}

async function deleteByUser(user) {
  const configs = {
    params: {
      user
    }
  };
  const deletar = await axios.delete(url, configs);
}

inserirTarefa("Gabriel", "minha tarefa");

console.log(resultado);
