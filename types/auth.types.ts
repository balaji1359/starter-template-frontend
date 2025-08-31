export interface User {
  id: number
  email: string
  full_name?: string
  is_active: boolean
  is_verified: boolean
  is_superuser: boolean
  created_at: string
  updated_at: string
}

export interface SigninCredentials {
  username: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  full_name?: string
}

export interface TokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
  access_token_expires_at: number
  refresh_token_expires_at: number
  is_revoked?: boolean
}

export interface AuthResponse extends TokenResponse {
  user: User
}

export interface GoogleAuthResponse {
  access_token: string
  refresh_token: string
  user: User
}

export interface AppleAuthResponse {
  access_token: string
  refresh_token: string
  user: User
}
