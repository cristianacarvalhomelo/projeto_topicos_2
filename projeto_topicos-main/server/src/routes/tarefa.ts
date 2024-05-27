import * as express from "express"
import {addTarefa, deleteTarefa, getTarefa, getTarefas, updateTarefa} from "../controllers/tarefa"

const routerTarefa = express.Router()

routerTarefa.post("/tarefas/registrar", addTarefa)
routerTarefa.get("/tarefas/listar", getTarefas)
routerTarefa.put("/tarefas/atualizar/:id", updateTarefa)
routerTarefa.delete("/tarefas/remover/:id", deleteTarefa)
routerTarefa.get("/tarefas/buscar/:id", getTarefa)

export default routerTarefa