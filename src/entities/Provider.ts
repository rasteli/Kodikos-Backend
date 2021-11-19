import { User } from "../entities/User"

export interface AuthProvider {
  authenticate: (code: string) => Promise<User>
}
