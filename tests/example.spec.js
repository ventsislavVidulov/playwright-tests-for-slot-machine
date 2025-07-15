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

  test('spin button is visibale', async ({ page }) => {
    const isVisible = await page.getByText('spin').isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('reels are visible', async ({ page }) => {
    const reels = await page.$$('#reels .reel');
    expect(reels.length).toBe(5)
  });

  test('reels have correct images', async ({ page }) => {
    // the slot starts with the same images of the Death Star
    await page.waitForSelector('#reels .reel img');
    const reels = await page.$$('#reels .reel img');
    for (let i = 0; i < reels.length; i++) {
      const src = await reels[i].getAttribute('src');
      expect(src).toBe(reelImagesUrls[i % reelImagesUrls.length].url);
    }
  });
});