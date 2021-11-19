import "dotenv/config"

import cors from "cors"
import express from "express"
import { Server } from "socket.io"
import { createServer } from "http"

import { router } from "./routes"

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

app.use(cors())
app.use(express.json())
app.use(router)

app.get("/callback", (req, res) => {
  const { code } = req.query

  return res.json({ code })
})

io.on("connection", socket => {
  console.log(`Client connected: ${socket.id}`)
})

export { server, io }
