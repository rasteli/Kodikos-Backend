import { prismaClient } from "../prisma"

export class GetPasswordsByUserService {
  async execute(user_id: string) {
    try {
      const passwords = await prismaClient.password.findMany({
        where: {
          user_id
        }
      })

      return { data: { passwords }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
