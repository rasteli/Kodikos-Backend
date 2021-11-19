import { sign } from "jsonwebtoken"

export function generateJWTToken(payload: Object, subject: string) {
  const token = sign(
    {
      payload
    },
    process.env.JWT_SECRET_KEY,
    {
      subject,
      expiresIn: "1d"
    }
  )

  return token
}
