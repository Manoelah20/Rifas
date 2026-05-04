#!/bin/bash

# 🔒 SECURITY SETUP SCRIPT FOR RAFFLE SYSTEM

echo "
╔════════════════════════════════════════════════════════════════╗
║  🔒 Raffle System - Security Setup & Configuration Guide      ║
╚════════════════════════════════════════════════════════════════╝
"

echo "📁 Project Structure Check..."
if [ -d "backend" ]; then
    echo "✅ Backend directory found"
else
    echo "❌ Backend directory not found"
    exit 1
fi

echo ""
echo "📦 Installing Dependencies..."
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🔑 Generating Security Keys..."
echo "Use: node generate-security-keys.js --save-local"
echo ""

echo "📝 Environment Setup..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo "Creating .env from .env.example..."
        cp .env.example .env
        echo "⚠️  Please update .env with the generated keys:"
        echo "   1. Run: node generate-security-keys.js"
        echo "   2. Copy the values to .env"
        echo "   3. Change NODE_ENV=production for production"
        echo ""
    else
        echo "❌ .env.example not found"
    fi
else
    echo "✅ .env file exists"
fi

echo ""
echo "📚 Documentation Files:"
echo "   ✅ SECURITY.md - Comprehensive security documentation"
echo "   ✅ IMPLEMENTATION_GUIDE.md - Step-by-step implementation"
echo "   ✅ .gitignore - Protects sensitive files"
echo ""

echo "════════════════════════════════════════════════════════════=="
echo "🚀 NEXT STEPS:"
echo "════════════════════════════════════════════════════════════=="
echo ""
echo "1️⃣  Generate Security Keys:"
echo "    node generate-security-keys.js"
echo ""
echo "2️⃣  Copy keys to .env file"
echo ""
echo "3️⃣  Start development server:"
echo "    npm run dev"
echo ""
echo "4️⃣  Read documentation:"
echo "    - SECURITY.md"
echo "    - IMPLEMENTATION_GUIDE.md"
echo ""
echo "════════════════════════════════════════════════════════════=="
echo ""
