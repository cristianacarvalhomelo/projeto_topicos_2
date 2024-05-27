import express from "express"
import routerTarefa from "./routes/tarefa"
import {AppDataSource} from "./data-source"
import cors from "cors"

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
}).catch((err) => {
  console.error("Error during Data Source initialization:", err)
})

const app = express()
const port = 3001
app.use(express.json())
app.use(cors())

app.use("/", routerTarefa)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
