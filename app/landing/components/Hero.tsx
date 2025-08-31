"use client"

import Link from "next/link"

export default function Hero() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
      {/* Left Content */}
      <div className="space-y-8 lg:text-left text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm font-medium text-amber-800">
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          <span>Introducing BeeKeeper 2.0</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
            Organize Your
            <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Digital Universe
            </span>
            <span className="block text-slate-900">
              Like Never Before
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg">
            Transform chaos into clarity with AI-powered link management that learns, adapts, and evolves with your workflow.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
          <Link href="/signup">
            <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Hive
            </button>
          </Link>
          <button className="px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold border border-slate-200 hover:bg-slate-50 transition-all duration-300">
            Watch Demo
          </button>
        </div>

        <div className="flex items-center space-x-8 lg:justify-start justify-center text-sm text-slate-500">
          <span>⭐ 4.8 rating</span>
          <span>50,000+ users</span>
        </div>
      </div>

      {/* Right Visual - Professional Bee Illustration */}
      <div className="relative lg:block hidden">
        <div className="relative w-full max-w-lg mx-auto">
          <img 
            src="/assets/bee/Lucid_Origin_Bee_Colony_System_Illustration_A_stylized_hive_wi_1-removebg-preview.png"
            alt="BeeKeeper Digital Organization System"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  )
}
