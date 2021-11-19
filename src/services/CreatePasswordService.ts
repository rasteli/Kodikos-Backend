import { io } from "../app"
import { prismaClient } from "../prisma"

export class CreatePasswordService {
  async execute(user_id: string, label: string, value: string) {
    try {
      const password = await prismaClient.password.create({
        data: {
          label,
          value,
          user_id
        }
      })

      io.emit("altered_database")

      return { data: { password }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
