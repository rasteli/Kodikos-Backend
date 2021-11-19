import { Request, Response } from "express"
import { CreatePasswordService } from "../services/CreatePasswordService"

export class CreatePasswordController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { label, value } = request.body

    const service = new CreatePasswordService()
    const result = await service.execute(user_id, label, value)

    return response.status(result.code).json(result.data)
  }
}
