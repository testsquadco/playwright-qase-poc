import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test.describe('BugBug.io Login Tests - Testing Both Success and Failure Scenarios', () => {
  test('Testing what happens when we try to login with wrong credentials', async ({ page }) => {
    qase.id(1);
    await page.goto('https://app.bugbug.io');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="email"]', 'eliya@testsquad.co');
    await page.fill('input[name="password"]', 'demo1234');
    try {
      await page.getByRole('button', { name: 'Log in' }).click();
    } catch {
      await page.locator('div:has-text("Log in")').click();
    }
    await page.waitForTimeout(2000);
    await expect(page.getByText('Unable to log in with provided credentials.')).toBeVisible();
    expect(page.url()).toContain('bugbug');
  });

  test('Testing what happens when we try to login with valid credentials', async ({ page }) => {
    qase.id(2);
    await page.goto('https://app.bugbug.io');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="email"]', 'eliya@testsquad.co');
    await page.fill('input[name="password"]', 'demo1234');
    try {
      await page.getByRole('button', { name: 'Log in' }).click();
    } catch {
      await page.locator('div:has-text("Log in")').click();
    }
    await page.waitForTimeout(5000);
    await expect(page.getByRole('heading')).toContainText('Your projects');
  });
});