#!/bin/bash

# BeeKeeper Web Frontend Startup Script
# This script installs dependencies and starts the Next.js web app

set -e  # Exit on any error

echo "🌐 Starting BeeKeeper Web Frontend Setup..."
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the frontend directory"
    echo "   cd user-auth/frontend"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is required but not installed"
    echo "   Please install Node.js 18+ and try again"
    echo "   https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js $NODE_VERSION detected"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is required but not installed"
    echo "   Please install npm and try again"
    exit 1
fi

# Check if .env.local file exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file from template..."
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo "⚠️  Please edit .env.local file with your Firebase configuration"
        echo "   Key variables to set:"
        echo "   - NEXT_PUBLIC_FIREBASE_API_KEY"
        echo "   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
        echo "   - NEXT_PUBLIC_FIREBASE_PROJECT_ID"
        echo "   - NEXT_PUBLIC_API_BASE_URL"
        echo ""
        echo "   Press Enter when ready to continue..."
        read
    else
        echo "❌ Error: .env.example not found. Please create .env.local manually"
        exit 1
    fi
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Check if .next build directory exists
if [ ! -d ".next" ]; then
    echo "🔨 Building Next.js application..."
    npm run build
    echo "✅ Build completed"
else
    echo "✅ Build already exists"
fi

# Start the development server
echo ""
echo "🎉 Web frontend setup complete!"
echo "=========================================="
echo "🚀 Starting Next.js development server..."
echo "🌐 Web App: http://localhost:3000"
echo "📖 Next.js Docs: https://nextjs.org/docs"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev
