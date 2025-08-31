# BeeKeeper Frontend - User Authentication System

A modern Next.js 15 frontend application with Firebase authentication, built with TypeScript, Tailwind CSS, and React 19.

## 🚀 Features

- **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Authentication**: Firebase Authentication with email/password and social login
- **Responsive Design**: Mobile-first responsive design with shadcn/ui components
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Zustand for client-side state management
- **Dark Mode**: Built-in dark/light theme support
- **Type Safety**: Full TypeScript support with strict mode

## 📋 Prerequisites

- Node.js 20.x or higher
- npm, yarn, or pnpm package manager
- Firebase project with Authentication enabled

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd user-auth/frontend
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install

# Using yarn
yarn install
```

### 3. Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:

```bash
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# Firebase Configuration (get from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=1:your-sender-id:web:your-app-id
```

📚 **For detailed environment setup instructions, see [ENV_SETUP.md](./ENV_SETUP.md)**

### 4. Start Development Server

```bash
# Using npm
npm run dev

# Using pnpm
pnpm run dev

# Using yarn
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

> [!TIP]
> <details>
> <summary>Installation Troubleshooting Steps For Older Operating Systems</summary>
> 
> If you are on an older macOS operating system such as `macOS 12.7.6 Monteray`, you will need to perform the below:
> - Navigate to https://nodejs.org/en/download and follow the steps to download `v22.17.0 (LTS)`
> - This version is tested to work fine. You may also leverage `v20.18.3 (LTS)` on your own.
> - Run `rm -rf node_modules package-lock.json`
> - Run `npm cache clean --force`
> - Run `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`
> - Run `\. "$HOME/.nvm/nvm.sh"`
> - Run `nvm install 22`
> - Run `npm install`
> - Run `npm run dev` to start the frontend :rocket:.
> </details>

- Launch http://localhost:3000 on your browser and you're off to the races :rocket:, either signup/signin to get started!

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication layouts
│   ├── dashboard/         # Dashboard pages
│   ├── signin/           # Sign-in page
│   ├── signup/           # Sign-up page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── firebase.ts       # Firebase configuration
│   ├── auth.ts          # Authentication utilities
│   └── utils.ts         # General utilities
├── hooks/                # Custom React hooks
├── stores/               # Zustand stores
├── types/                # TypeScript type definitions
├── .env.example          # Environment variables example
├── .env.local           # Local environment (gitignored)
└── ENV_SETUP.md         # Environment setup guide
```

## 🔧 Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## 🧪 Testing the Application

### 1. Authentication Flow
1. Visit `http://localhost:3000`
2. Click "Sign Up" to create a new account
3. Enter email and password
4. Verify email if email verification is enabled
5. Sign in with your credentials

### 2. Firebase Authentication
- Test email/password authentication
- Test Google Sign-In (if configured)
- Test password reset functionality
- Verify user session persistence

## ⚙️ Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication
3. Configure sign-in methods
4. Get your Firebase config
5. Update `.env.local` with your Firebase credentials

### Backend Integration
- Ensure backend is running on `http://localhost:8000`
- Update `NEXT_PUBLIC_API_BASE_URL` if backend is on different port
- Test API connectivity from the frontend

## 🔒 Security

- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Firebase configuration is safe to expose publicly
- Never put sensitive backend API keys in `NEXT_PUBLIC_` variables
- Use different Firebase projects for development and production

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npm run build
vercel --prod
```

### Other Platforms
- **Netlify**: Build command `npm run build`, publish directory `out`
- **Railway**: Connect repository and set environment variables
- **Docker**: Use the included Dockerfile for containerization

## 🛠️ Customization

### Theming
- Modify `app/globals.css` for global styles
- Update `tailwind.config.ts` for Tailwind configuration
- Customize theme in `components/ui/theme-provider.tsx`

### Components
- Add new UI components in `components/ui/`
- Create form components in `components/forms/`
- Build layout components in `components/layout/`

## 📚 Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Firebase Auth
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand
- **HTTP Client**: Axios/Fetch API
- **Development**: ESLint, Prettier, Husky

## 🐛 Troubleshooting

### Common Issues

1. **"Firebase configuration error"**
   - Check all Firebase environment variables
   - Ensure Firebase project is properly configured

2. **"API calls failing"**
   - Verify backend is running
   - Check `NEXT_PUBLIC_API_BASE_URL`
   - Ensure CORS is configured on backend

3. **"Authentication not working"**
   - Check Firebase Authentication is enabled
   - Verify sign-in methods are configured
   - Check browser console for errors

### Development Tips
- Use browser dev tools to debug authentication state
- Check Network tab for API call failures
- Enable Firebase debug mode for detailed logs
- Use `npm run type-check` to catch TypeScript errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- Check [ENV_SETUP.md](./ENV_SETUP.md) for environment configuration help
- Review Firebase documentation for authentication setup
- Open an issue on GitHub for bugs or feature requests

---

**Happy coding! 🚀**