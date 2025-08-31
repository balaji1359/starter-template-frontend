"use client"

export default function Features() {
  return (
    <div id="features" className="space-y-20">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
          Everything you need to
          <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            organize efficiently
          </span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Professional-grade features designed to streamline your digital workflow
        </p>
      </div>

      {/* Main Feature Card with Bee Illustration */}
      <div className="bg-white rounded-3xl p-12 lg:p-16 shadow-xl border border-slate-200 relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 lg:text-left text-center">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Intelligent Link
                <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Organization
                </span>
              </h2>
              <p className="text-slate-600 text-lg">
                Harness the power of AI to automatically categorize and organize your digital resources
              </p>
            </div>
            
            <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Explore Features
            </button>
          </div>

          <div className="relative">
            <img 
              src="/assets/bee/Lucid_Origin_Bee_Colony_System_Illustration_A_stylized_hive_wi_1-removebg-preview.png"
              alt="BeeKeeper Organization System"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">AI-Powered Organization</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Intelligent categorization that learns from your behavior and organizes content automatically.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">Advanced Search</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Find content instantly with semantic search that understands context and meaning.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">Team Collaboration</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Share and collaborate on link collections with team members seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
