import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {FaEdit, FaTrash} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import TarefaService from "@/services/tarefaService";

const ListarTarefas = () => {
    const [tarefas, setTarefas] = useState<any>(null);
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        TarefaService.getTarefas().then((data) => {
            setTarefas(data)
            console.log(data)
        }).catch((error) => {
            console.error('Erro ao listar tarefas:', error)
            setError(error)
        })
    }, [])

    const handleRemove = async (id: any) => {
        TarefaService.deleteTarefa(id).then((data) => {
            setTarefas(tarefas.filter((tarefa: { id: any }) => tarefa.id !== id))
        }).catch((error) => {
            console.error('Erro ao deletar tarefa:', error)
            setError(error)
        })
    }


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tarefas) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Lista de Tarefas</h3>
            <Table responsive="sm">
                <thead>
                <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Data</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {tarefas.map((tarefa: any) => (
                    <tr key={tarefa.id}>
                        <td>{tarefa.titulo}</td>
                        <td>{tarefa.descricao}</td>
                        <td>{tarefa.data}</td>
                        <td>{tarefa.prioridade}</td>
                        <td>{tarefa.status}</td>
                        <td>
                            <Button onClick={() => navigate(`/atualizar/${tarefa.id}`)}>
                                <FaEdit />
                            </Button>
                            <Button onClick={() => handleRemove(tarefa.id)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ListarTarefas