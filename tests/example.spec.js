// @ts-check
import { test, expect } from '@playwright/test';



test.beforeEach(async ({ page }) => {
  await page.goto('https://johakr.github.io/html5-slot-machine/');
});

const reelImagesUrls = [
  {
    name: 'Death Star',
    url: 'https://johakr.github.io/html5-slot-machine/3392ebef20e51148368e.svg'
  },
];


test.describe('start-up', () => {
  test('page has title', async ({ page }) => {

    await expect(page).toHaveTitle('HTML 5 Slot Machine');
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
