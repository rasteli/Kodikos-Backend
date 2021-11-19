import { Request, Response } from "express"
import { DeletePasswordService } from "../services/DeletePasswordService"

export class DeletePasswordController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const service = new DeletePasswordService()
    const result = await service.execute(id)

    return response.status(result.code).json(result.data)
  }
}
