import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/The Care Ranch Intake/);

  await expect(page.getByRole('heading', { name: /The Care Ranch/i })).toBeVisible();
});

test('can navigate to sign in', async ({ page }) => {
  await page.goto('/');

  const signInLink = page.getByRole('link', { name: /Sign in/i });
  await expect(signInLink).toBeVisible();
  await signInLink.click();

  await expect(page).toHaveURL(/\/api\/auth\/signin/);
});
