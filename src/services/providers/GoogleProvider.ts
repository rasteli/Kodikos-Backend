import axios from "axios"

import { User } from "../../entities/User"
import { AuthProvider } from "../../entities/Provider"

interface AuthResponse {
  access_token: string
}

interface GoogleAuthResponse {
  name: string
  picture: string
}

export class GoogleProvider implements AuthProvider {
  async authenticate(code: string): Promise<User> {
    const authUrl = "https://www.googleapis.com/oauth2/v1/userinfo"
    const tokenUrl = "https://oauth2.googleapis.com/token"

    const { data: authResponse } = await axios.post<AuthResponse>(tokenUrl, {
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.REDIRECT_URL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET
    })

    const { data } = await axios.get<GoogleAuthResponse>(authUrl, {
      headers: {
        Authorization: `Bearer ${authResponse.access_token}`
      }
    })

    const { name, picture } = data
    const user = { name, avatar_url: picture }

    return user
  }
}
