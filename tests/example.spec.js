// @ts-check
import { test, expect } from '@playwright/test';
import { log } from 'console';

test.beforeEach(async ({ page }) => {
  await page.goto('https://johakr.github.io/html5-slot-machine/');
});

const reelImagesUrls = [
  {
    name: 'AT-AT',
    url: 'https://johakr.github.io/html5-slot-machine/0379613a4269155f45b3.svg'
  },
  {
    name: 'C-3PO',
    url: 'https://johakr.github.io/html5-slot-machine/92e4eecf1c83293e3395.svg'
  },
  {
    name: 'Darth Vader',
    url: '	https://johakr.github.io/html5-slot-machine/9ae79499243776a4de6e.svg'
  },
  {
    name: 'Death Star',
    url: 'https://johakr.github.io/html5-slot-machine/3392ebef20e51148368e.svg'
  },
  {
    name: 'Millennium Falcon',
    url: 'https://johakr.github.io/html5-slot-machine/b33cd68d7fb870c59309.svg'
  },
  {
    name: 'R2-D2',
    url: 'https://johakr.github.io/html5-slot-machine/a97a2e9fa184dcab972b.svg'
  },
  {
    name: 'Stormtrooper',
    url: '	https://johakr.github.io/html5-slot-machine/61e5b40f641dff097d3f.svg'
  },
  {
    name: 'TIE Fighter',
    url: 'https://johakr.github.io/html5-slot-machine/7d600c80a7f5f31bc337.svg'
  },
  {
    name: 'Yoda',
    url: 'https://johakr.github.io/html5-slot-machine/4c0ad8f5f10199effb77.svg'
  }
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

  test('autoplay button is visible', async ({ page }) => {
    const isVisible = await page.getByText('autoplay').isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('jackpot is visible', async ({ page }) => {
    const jackpot = await page.$('#jackpot');
    expect(jackpot).not.toBeNull();
  });
});

async function getSlotMachineState(page) {
  //returns the state of the slot machine reels
  const reels = await page.$$('#reels .reel');
  const slotMachineState = [];
  for (let i = 0; i < reels.length; i++) {
    const reel = await reels[i].$$('img');
    const reelState = [];
    for (let j = 0; j < reel.length; j++) {
      const img = reel[j];
      const src = await img.getAttribute('src');
      reelImagesUrls.find((item) => {
        if (item.url === src) {
          reelState.push(item);
        }
      });
    }
    slotMachineState.push(reelState);
  }
  return slotMachineState;
}

// test('test', async ({ page }) => {
//   getSlotMachineState(page).then((state) => {
//     for (let i = 0; i < state.length; i++) {
//       log(`Reel ${i + 1}:`);
//       for (let j = 0; j < state[i].length; j++) {
//         log(`- ${state[i][j].name}`);
//       }
//     }
//   });
// });