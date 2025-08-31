"use client"

export function EnvTest() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded text-xs">
      <div>API URL: {apiUrl || "❌ NOT SET"}</div>
      <div>Type: {typeof apiUrl}</div>
    </div>
  )
}
