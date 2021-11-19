import { io } from "../app"
import { prismaClient } from "../prisma"

export class UpdatePasswordService {
  async execute(label: string, pwd_id: string) {
    try {
      const password = await prismaClient.password.update({
        where: {
          id: pwd_id
        },
        data: {
          label
        }
      })

      io.emit("altered_database")

      return { data: { password }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
