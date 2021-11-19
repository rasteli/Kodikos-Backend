import axios from "axios"

import { User } from "../../entities/User"
import { AuthProvider } from "../../entities/Provider"

interface AuthResponse {
  access_token: string
}

interface GitHubUserResponse {
  login: string
  avatar_url: string
}

export class GitHubProvider implements AuthProvider {
  async authenticate(code: string): Promise<User> {
    const userUrl = "https://api.github.com/user"
    const authUrl = "https://github.com/login/oauth/access_token"

    const { data: authResponse } = await axios.post<AuthResponse>(
      authUrl,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      {
        headers: {
          Accept: "application/json"
        }
      }
    )

    const { data: userResponse } = await axios.get<GitHubUserResponse>(
      userUrl,
      {
        headers: {
          Authorization: `token ${authResponse.access_token}`
        }
      }
    )

    const { login, avatar_url } = userResponse
    const user = { name: login, avatar_url }

    return user
  }
}
