import { io } from "../app"
import { prismaClient } from "../prisma"

export class DeletePasswordService {
  async execute(pwd_id: string) {
    try {
      await prismaClient.password.delete({
        where: {
          id: pwd_id
        }
      })

      io.emit("altered_database")

      return { data: { message: "Success" }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
