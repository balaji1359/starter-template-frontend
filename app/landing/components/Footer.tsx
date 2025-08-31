"use client"

export default function Footer() {
  return (
    <footer className="relative z-10 py-16 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              BeeKeeper
            </span>
          </div>
          
          <p className="text-slate-500 text-lg">
            © {new Date().getFullYear()} BeeKeeper. All rights reserved.
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-slate-600">
            <a href="#" className="hover:text-amber-600 transition-colors duration-200 font-medium">Privacy Policy</a>
            <a href="#" className="hover:text-amber-600 transition-colors duration-200 font-medium">Terms of Service</a>
            <a href="#" className="hover:text-amber-600 transition-colors duration-200 font-medium">Support</a>
            <a href="#" className="hover:text-amber-600 transition-colors duration-200 font-medium">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
