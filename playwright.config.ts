import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Debug: Check if the file exists
const envPath = path.resolve(__dirname, '.env.local');
console.log(`Looking for .env file at: ${envPath}`);
console.log(`File exists: ${fs.existsSync(envPath)}`);

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

//const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const baseURL = process.env.LL_PW_LOCAL === '1' ? 'http://localhost:3000/' : 'https://beekeeper.ai/';
const loginEmail = process.env.LL_PW_USERNAME;
const loginPassword = process.env.LL_PW_PASSWORD;



export default defineConfig({
  //testDir: './tests/e2e',
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60000,
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [// Setup project
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    //{ name: 'user-login', testMatch: /.*user-login.spec\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] ,
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: [
        'setup'
      ],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] ,
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: [
        'setup'
      ],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] ,
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: [
        'setup'
      ],
    },
    {
      name: 'msedge',
      use: { 
        channel: 'msedge',
        ...devices['Desktop Edge'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: [
        'setup'
      ],
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: true, //!process.env.CI,
  },
});