"use client"

export default function Stats() {
  return (
    <div className="text-center space-y-16">
      <div className="space-y-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
          Trusted by professionals
          <span className="block text-slate-600">worldwide</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Join thousands who have streamlined their digital workflow
        </p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="space-y-3 text-center">
            <div className="text-4xl font-bold text-slate-900">2M+</div>
            <div className="text-slate-600 font-medium">Links Organized</div>
            <div className="text-slate-500 text-sm">Across all workspaces</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="space-y-3 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">50K+</div>
            <div className="text-slate-600 font-medium">Active Users</div>
            <div className="text-slate-500 text-sm">Growing daily</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="space-y-3 text-center">
            <div className="text-4xl font-bold text-slate-900">99.9%</div>
            <div className="text-slate-600 font-medium">Uptime</div>
            <div className="text-slate-500 text-sm">Enterprise grade</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="space-y-3 text-center">
            <div className="text-4xl font-bold text-slate-900">24/7</div>
            <div className="text-slate-600 font-medium">Support</div>
            <div className="text-slate-500 text-sm">Always available</div>
          </div>
        </div>
      </div>
    </div>
  )
}
