// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  // Directory where your Playwright tests reside
  testDir: './e2e-tests', // Or choose a different path like './playwright-tests'

  // Maximum time one test can run for.
  timeout: 30 * 1000,

  // Expectations timeout
  expect: {
    timeout: 5000
  },

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI. Adjust based on your CI resources.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: 'html', // Generates an HTML report

  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:8080', // CHANGE TO YOUR APP'S DEV URL

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // (Optional) Folder for test artifacts such as screenshots, videos, traces, etc.
  // outputDir: 'test-results/',

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:8080', // Use the same URL as baseURL
    reuseExistingServer: !process.env.CI,
  },
})