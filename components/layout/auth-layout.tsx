"use client"

import type React from "react"
import { Link2, Sparkles, Shield, Users, Zap } from "lucide-react"
import Image from "next/image"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  showFeatures?: boolean
}

export function AuthLayout({ children, title, subtitle, showFeatures = true }: AuthLayoutProps) {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "AI-powered organization that learns from you",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Lightning fast saving and organization",
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Seamless access across all your devices",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Secure and private with enterprise-grade protection",
    },
  ]

  return (
    <div className="min-h-screen bg-background dark:bg-neutral-900 flex">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background dark:bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/80 dark:from-neutral-900 dark:via-neutral-900/90 dark:to-neutral-900/80" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4A6FFF_1px,transparent_1px)] [background-size:20px_20px]"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center w-full p-12">
          <div className="max-w-lg text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <Image
                  src="/icon48.png"
                  alt="BeeKeeper Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 dark:from-white dark:to-gray-200">BeeKeeper</h1>
              <p className="text-xl text-muted-foreground dark:text-neutral-300 leading-relaxed">
                Intelligently save, organize, and resurface your favorite web content when you need it most
              </p>
            </div>

            {/* Feature highlights */}
            {showFeatures && (
              <div className="space-y-4 text-left">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-primary dark:text-white">
                      {feature.icon}
                    </div>
                    <span className="text-muted-foreground dark:text-neutral-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl mb-4">
              <Image
                src="/icon48.png"
                alt="BeeKeeper Logo"
                width={24}
                height={24}
                className="rounded-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">BeeKeeper</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
