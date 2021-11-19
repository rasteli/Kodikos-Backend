import { verify } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ error: "token.required" })
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub } = verify(token, process.env.JWT_SECRET_KEY)

    request.user_id = sub

    return next()
  } catch {
    return response.status(401).json({ error: "token.invalid" })
  }
}
