import { Request, Response } from "express"

import { GitHubProvider } from "../services/providers/GitHubProvider"
import { GoogleProvider } from "../services/providers/GoogleProvider"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { code, provider } = request.body

    const providers = {
      github: new GitHubProvider(),
      google: new GoogleProvider()
    }

    const service = new AuthenticateUserService(providers[provider])
    const result = await service.execute(code)

    return response.status(result.code).json(result.data)
  }
}
