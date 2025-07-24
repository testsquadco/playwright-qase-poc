# Playwright + Qase.io Integration Project

This project demonstrates how to integrate Playwright Test Runner with Qase.io for automated test reporting using TypeScript.

## Features

- ✅ Playwright Test Runner with TypeScript
- ✅ Qase.io integration using `playwright-qase-reporter`
- ✅ Environment variable support for secure credential management
- ✅ Chromium browser support
- ✅ Automatic test result reporting to Qase.io

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Qase.io account with API access

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd playwright-qase-poc
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npm run install:browsers
   ```

## Configuration

### Environment Variables

The project uses a `.env` file to store Qase.io credentials. The file is already configured with:

```env
QASE_TOKEN=dbf3dccebcea1971e691ce605ec27716f2b05f8435c784afdd72f0dc7ded749d
QASE_PROJECT=DEMO
```

**Important**: In a real project, never commit API tokens to version control. Add `.env` to your `.gitignore` file and use environment-specific configuration.

### Playwright Configuration

The `playwright.config.ts` file is configured with:
- Qase.io reporter integration
- Chromium browser support
- Test result upload to Qase.io
- Automatic run completion

## Running Tests

### Basic Test Execution
```bash
npm test
```

### Run Tests in Headed Mode (with browser UI)
```bash
npm run test:headed
```

### Debug Mode
```bash
npm run test:debug
```

## Test Structure

### Test File: `tests/qase-demo.spec.ts`

The demo test performs the following actions:
1. Navigates to https://qase.io
2. Verifies the page title contains "Test"
3. Links the test to Qase test case ID 1 using `qase.id(1)`

```typescript
import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('should navigate to Qase.io and verify page title contains "Test"', async ({ page }) => {
  qase.id(1); // Links to Qase test case ID 1
  
  await page.goto('https://qase.io');
  await page.waitForLoadState('networkidle');
  
  const title = await page.title();
  expect(title).toContain('Test');
});
```

## Viewing Results in Qase.io

After running the tests, results will be automatically reported to your Qase.io project:

1. **Login to Qase.io**: Go to [https://app.qase.io](https://app.qase.io)
2. **Navigate to your project**: Select the "DEMO" project (or your configured project)
3. **View Test Runs**: Go to "Test Runs" section to see the latest execution results
4. **Check Test Cases**: The test will be linked to test case ID 1 if it exists in your project

## Project Structure

```
playwright-qase-poc/
├── tests/
│   └── qase-demo.spec.ts     # Demo test file
├── .env                      # Environment variables (Qase credentials)
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies and scripts
├── playwright.config.ts     # Playwright configuration with Qase reporter
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Troubleshooting

### Common Issues

1. **Test fails with "Test" not found in title**:
   - The Qase.io website might have changed their title
   - Check the actual page title and update the test accordingly

2. **Qase.io reporting not working**:
   - Verify your `QASE_TOKEN` is correct and has proper permissions
   - Ensure the `QASE_PROJECT` code matches your project in Qase.io
   - Check that test case ID 1 exists in your Qase project

3. **Browser not found**:
   - Run `npm run install:browsers` to install Playwright browsers

### Debug Mode

For detailed debugging, you can:
1. Enable debug mode in the Qase reporter (already enabled in config)
2. Check the console output for Qase.io API responses
3. Use Playwright's built-in debugging tools

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Qase.io Documentation](https://help.qase.io/)
- [playwright-qase-reporter Documentation](https://github.com/qase-tms/qase-javascript/tree/main/qase-playwright)

## License

MIT
