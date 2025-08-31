class AppleAuthService {
  private static getAppleOAuthURL(mode: "login" | "register") {
    const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    // Check if required environment variables are available
    if (!clientId || !baseUrl) {
      console.warn("Apple OAuth not configured. Missing environment variables:")
      if (!clientId) console.warn("- NEXT_PUBLIC_APPLE_CLIENT_ID")
      if (!baseUrl) console.warn("- NEXT_PUBLIC_API_BASE_URL")
      return null
    }

    const rootUrl = "https://appleid.apple.com/auth/authorize"

    // Remove trailing slash from baseUrl
    const cleanBaseUrl = baseUrl.replace(/\/$/, "")

    const options = {
      client_id: clientId,
      redirect_uri: `${cleanBaseUrl}/auth/apple/callback`,
      response_type: "code",
      response_mode: "form_post", // Apple requires form_post for web
      scope: "name email",
      state: mode,
    }

    const qs = new URLSearchParams(options)
    return `${rootUrl}?${qs.toString()}`
  }

  public static initiateAppleLogin() {
    const url = this.getAppleOAuthURL("login")

    if (!url) {
      alert(
        "Apple OAuth is not configured. Please set up your Apple Client ID and API Base URL in environment variables.",
      )
      return
    }

    window.location.href = url
  }

  public static initiateAppleSignup() {
    const url = this.getAppleOAuthURL("register")

    if (!url) {
      alert(
        "Apple OAuth is not configured. Please set up your Apple Client ID and API Base URL in environment variables.",
      )
      return
    }

    window.location.href = url
  }

  public static isConfigured(): boolean {
    return !!(process.env.NEXT_PUBLIC_APPLE_CLIENT_ID && process.env.NEXT_PUBLIC_API_BASE_URL)
  }
}

export default AppleAuthService