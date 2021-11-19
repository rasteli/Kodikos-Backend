import { Request, Response } from "express"
import { GetPasswordsByUserService } from "../services/GetPasswordsByUserService"

export class GetPasswordsByUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const service = new GetPasswordsByUserService()
    const result = await service.execute(user_id)

    return response.status(result.code).json(result.data)
  }
}
