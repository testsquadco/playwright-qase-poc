import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['playwright-qase-reporter', {
      mode: 'testops',
      debug: true,
      testops: {
        api: {
          token: process.env.QASE_TOKEN,
        },
        project: process.env.QASE_PROJECT,
        uploadAttachments: true,
        run: {
          complete: true,
        },
      },
    }],
  ],
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
