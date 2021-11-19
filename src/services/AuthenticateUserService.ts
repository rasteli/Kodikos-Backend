import { prismaClient } from "../prisma"
import { AuthProvider } from "../entities/Provider"
import { generateJWTToken } from "../utils/token-gen"

export class AuthenticateUserService {
  constructor(private provider: AuthProvider) {}

  async execute(code: string) {
    try {
      const providerUser = await this.provider.authenticate(code)

      let user = await prismaClient.user.findFirst({
        where: {
          name: providerUser.name
        }
      })

      if (!user) {
        user = await prismaClient.user.create({
          data: {
            name: providerUser.name,
            avatar_url: providerUser.avatar_url
          }
        })
      }

      const token = generateJWTToken(user, user.id)

      return { data: { token, user }, code: 200 }
    } catch (error) {
      console.log(error.message)
      return { data: { error: error.message }, code: 400 }
    }
  }
}
