import { io } from "../app"
import { prismaClient } from "../prisma"
import { IPasswordProps, generatePassword } from "../utils/pwd-gen"

export class GeneratePasswordService {
  async execute(user_id: string, length: number, pwdProps: IPasswordProps) {
    try {
      const generatedPassword = generatePassword(pwdProps, length)

      const password = await prismaClient.password.create({
        data: {
          value: generatedPassword,
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
