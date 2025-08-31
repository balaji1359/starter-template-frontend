"use client"

import Link from "next/link"

export default function CallToAction() {
  return (
    <div className="text-center space-y-8">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-16 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
        <div className="relative space-y-8 z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to streamline your
            <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              digital workflow?
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who have transformed their productivity with BeeKeeper's intelligent organization system.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link href="/signup">
              <button className="px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Start Free Trial
              </button>
            </Link>
            <Link href="/login">
              <button className="px-12 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                Sign In
              </button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 pt-6 text-slate-400">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Free Forever Plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">No Credit Card Required</span>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
