import { Request, Response } from "express"
import { GeneratePasswordService } from "../services/GeneratePasswordService"

export class GeneratePasswordController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { length, pwdProps } = request.body

    const service = new GeneratePasswordService()
    const result = await service.execute(user_id, length, pwdProps)

    return response.status(result.code).json(result.data)
  }
}
