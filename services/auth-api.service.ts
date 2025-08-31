import type { SigninCredentials, RegisterCredentials, AuthResponse, TokenResponse, User } from "@/types/auth.types"

export class AuthApiService {
  private static getApiBaseUrl(): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not configured")
    }

    // Remove trailing slash if present
    return baseUrl.replace(/\/$/, "")
  }

  private static async makeRequest<T>(endpoint: string, options: RequestInit = {}, queryParams: string = ""): Promise<T> {
    const API_BASE_URL = this.getApiBaseUrl()
    const url = `${API_BASE_URL}${endpoint}${queryParams}`

    const { headers: customHeaders = {}, ...restOptions } = options

    try {
      console.log(`Making request to ${url}`)
      const response = await fetch(url, {
        ...restOptions,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...customHeaders,
        },
      }).catch(error => {
        console.error(`Network error for ${url}:`, error)
        throw new Error(`Network error: ${error.message}`)
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.detail || data.message || `HTTP ${response.status}: ${response.statusText}`
        throw new Error(errorMessage)
      }

      return data as T
    } catch (error) {
      const printable = error instanceof Error ? error.message : JSON.stringify(error, null, 2)
      console.error("Auth API Error:", printable)
      throw error
    }
  }

  static storeTokens(tokenResponse: TokenResponse): void {
    if (typeof window === "undefined") return

    console.log('AuthApiService - Storing tokens:', {
      hasAccessToken: !!tokenResponse.access_token,
      hasRefreshToken: !!tokenResponse.refresh_token,
      expiresAt: tokenResponse.access_token_expires_at
    })

    localStorage.setItem("access_token", tokenResponse.access_token)
    if (tokenResponse.refresh_token) {
      localStorage.setItem("refresh_token", tokenResponse.refresh_token)
    }
    localStorage.setItem("token_type", tokenResponse.token_type)
    
    // expires_at is Unix timestamp in seconds, convert to milliseconds for JavaScript
    const accessTokenExpiry = tokenResponse.access_token_expires_at * 1000
    localStorage.setItem("access_token_expires_at", accessTokenExpiry.toString())
    
    const refreshTokenExpiry = tokenResponse.refresh_token_expires_at * 1000
    localStorage.setItem("refresh_token_expires_at", refreshTokenExpiry.toString())
    
    // Store revocation status
    localStorage.setItem("is_revoked", (tokenResponse.is_revoked || false).toString())
    
    console.log('AuthApiService - Tokens stored in localStorage')
  }

  static async signin(data: SigninCredentials): Promise<AuthResponse> {
    // Create form data
    const formData = new URLSearchParams()
    formData.append("username", data.username)
    formData.append("password", data.password)
    formData.append("grant_type", "password")
    formData.append("client_id", "string")
    formData.append("client_secret", "string")

    console.log('AuthApiService - Making login request...')

    const response = await this.makeRequest<AuthResponse>("/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })

    console.log('AuthApiService - Login response received:', {
      hasUser: !!response.user,
      userVerified: response.user?.is_verified,
      isRevoked: response.is_revoked,
      hasAccessToken: !!response.access_token
    })

    // Only store tokens if user is verified and not revoked
    if (response.user.is_verified && !response.is_revoked) {
      console.log('AuthApiService - User verified and not revoked, storing tokens...')
      this.storeTokens(response)
      console.log('AuthApiService - Tokens stored successfully')
    } else {
      console.log('AuthApiService - NOT storing tokens - user not verified or is revoked')
    }

    return response
  }

  /**
   * Verify Firebase token and get user data
   */
  static async verifyFirebaseToken(firebaseToken: string): Promise<AuthResponse> {
    console.log('AuthApiService - Verifying Firebase token...')

    const response = await this.makeRequest<AuthResponse>("/auth/firebase/verify", {
      method: "POST",
      body: JSON.stringify({ firebase_token: firebaseToken }),
    })

    // Type assertion to ensure proper typing
    const authResponse = response as AuthResponse

    console.log('AuthApiService - Firebase verification response received:', {
      hasUser: !!authResponse.user,
      userVerified: authResponse.user?.is_verified,
      isRevoked: authResponse.is_revoked,
      hasAccessToken: !!authResponse.access_token
    })

    // Store tokens if user is verified and not revoked
    if (authResponse.user.is_verified && !authResponse.is_revoked) {
      console.log('AuthApiService - User verified and not revoked, storing tokens...')
      this.storeTokens(authResponse)
      console.log('AuthApiService - Tokens stored successfully')
    } else {
      console.log('AuthApiService - NOT storing tokens - user not verified or is revoked')
    }

    return authResponse
  }

  static async register(data: RegisterCredentials): Promise<AuthResponse> {
    const response = await this.makeRequest<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    })

    // Only store tokens if user is verified and not revoked
    if (response.user.is_verified && !response.is_revoked) {
      this.storeTokens(response)
    }

    return response
  }

  static async forgotPassword(data: { email: string }): Promise<void> {
    return this.makeRequest("/auth/request-password-reset", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async resetPassword(data: { token: string; new_password: string }): Promise<void> {
    return this.makeRequest("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async refreshToken(data: { refresh_token: string }): Promise<TokenResponse> {
    return this.makeRequest<TokenResponse>(`/auth/refresh?refresh_token=${encodeURIComponent(data.refresh_token)}`, {
      method: "POST"
    })
  }

  static async logout(): Promise<void> {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null

    if (!refreshToken || !accessToken) {
      throw new Error("No tokens found")
    }

    return this.makeRequest(`/auth/signout?refresh_token=${encodeURIComponent(refreshToken)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
  }

  static async getUser(): Promise<User> {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null

    console.log('AuthApiService - getUser called')
    console.log('AuthApiService - localStorage contents:', {
      access_token: token ? `${token.substring(0, 20)}...` : 'null',
      refresh_token: typeof window !== "undefined" ? (localStorage.getItem("refresh_token") ? 'present' : 'missing') : 'N/A',
      expires_at: typeof window !== "undefined" ? localStorage.getItem("access_token_expires_at") : 'N/A'
    })

    if (!token) {
      console.error('AuthApiService - No access token found in localStorage')
      throw new Error("No access token found")
    }

    console.log('AuthApiService - Making /users/me request with token')
    
    try {
      const user = await this.makeRequest<User>("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      console.log('AuthApiService - User data received:', user)
      return user
    } catch (error) {
      console.error('AuthApiService - Failed to fetch user:', error)
      throw error
    }
  }

  static async updateProfile(data: { full_name?: string; email?: string; current_password?: string; new_password?: string }): Promise<User> {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null

    if (!token) {
      throw new Error("No access token found")
    }

    return this.makeRequest<User>("/users/me", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  }

  static async requestPasswordReset(email: string): Promise<{ message: string }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/request-password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error('Failed to request password reset');
    return res.json();
  }

  // Test connectivity
  static async testConnection(): Promise<boolean> {
    try {
      const API_BASE_URL = this.getApiBaseUrl()
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
      return response.ok
    } catch {
      return false
    }
  }

  // Get API configuration status
  static getConfigurationStatus(): { isConfigured: boolean; baseUrl?: string; error?: string } {
    try {
      const baseUrl = this.getApiBaseUrl()
      return { isConfigured: true, baseUrl }
    } catch (error) {
      return {
        isConfigured: false,
        error: error instanceof Error ? error.message : "Unknown configuration error",
      }
    }
  }

  // Check if tokens are expired
  static isTokenExpired(): boolean {
    if (typeof window === "undefined") return true

    const accessTokenExpiry = localStorage.getItem("access_token_expires_at")
    if (!accessTokenExpiry) return true

    return Date.now() > parseInt(accessTokenExpiry)
  }

  // Check if refresh token is expired
  static isRefreshTokenExpired(): boolean {
    if (typeof window === "undefined") return true

    const refreshTokenExpiry = localStorage.getItem("refresh_token_expires_at")
    if (!refreshTokenExpiry) return true

    return Date.now() > parseInt(refreshTokenExpiry)
  }

  // Check if tokens are revoked
  static isTokenRevoked(): boolean {
    if (typeof window === "undefined") return true

    const isRevoked = localStorage.getItem("is_revoked")
    return isRevoked === "true"
  }

  // Delete user account
  static async deleteAccount(): Promise<void> {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null

    if (!token) {
      throw new Error("No access token found")
    }

    return this.makeRequest("/users/me", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
