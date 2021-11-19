import { Request, Response } from "express"
import { UpdatePasswordService } from "../services/UpdatePasswordService"

export class UpdatePasswordController {
  async handle(request: Request, response: Response) {
    const { label, pwd_id } = request.body

    const service = new UpdatePasswordService()
    const result = await service.execute(label, pwd_id)

    return response.status(result.code).json(result.data)
  }
}
