import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import {Tarefa} from "../models/tarefa"

export const getTarefas = async (req: Request, res: Response) => {
    try {
        const tarefas:Tarefa[] = await AppDataSource.getRepository(Tarefa).find()
        res.status(200).json(tarefas)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar tarefas' })
    }
}

export const getTarefa = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results: Tarefa = await AppDataSource.getRepository(Tarefa).findOneBy({id: id})
    if(results == null)
        return res.status(500).json({ message: 'Tarefa não encontrada' });

    return res.status(200).send(results)
}

export const addTarefa = async (req: Request, res: Response) => {
    const tarefa: Tarefa[] = AppDataSource.getRepository(Tarefa).create(req.body)
    const results: Tarefa[] = await AppDataSource.getRepository(Tarefa).save(tarefa)
    return res.send(results)
}

export const updateTarefa = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const tarefa: Tarefa = await AppDataSource.
        getRepository(Tarefa).
        findOneBy({ id: id })

    AppDataSource.getRepository(Tarefa).merge(tarefa, req.body)
    const results: Tarefa = await AppDataSource.getRepository(Tarefa).save(tarefa)
    return res.send(results)
}

export const deleteTarefa = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results = await AppDataSource.getRepository(Tarefa).delete(id)
    return res.send(results)
}