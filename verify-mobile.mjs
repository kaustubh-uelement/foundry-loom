import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://localhost:3000';
const outputDir = '/Users/u-elementtechnologiesprivatelimited/.gemini/antigravity/brain/37a9793f-be5a-47b7-af8b-e1c5f27b23db';

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 390, height: 844, isMobile: true, hasTouch: true },
  });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.querySelector('.tfl')?.setAttribute('data-theme', 'dark');
  });
  await new Promise(r => setTimeout(r, 800));

  // 1. Initial mobile view (Hero without overlapping badge)
  await page.screenshot({ path: path.join(outputDir, 'mobile_initial_verified.png') });
  console.log('Saved mobile_initial_verified.png');

  // 2. Open mobile menu
  const menuBtn = await page.$('.menu-toggle');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'mobile_menu_open_verified.png') });
    console.log('Saved mobile_menu_open_verified.png');

    // Close menu before scrolling
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 400));
  }

  // 3. Scroll down to check sticky nav
  await page.evaluate(() => {
    window.scrollTo(0, 1000);
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, 'mobile_scrolled_verified.png') });
  console.log('Saved mobile_scrolled_verified.png');

  // --- Now test light mode ---
  await page.evaluate(() => {
    document.querySelector('.tfl')?.setAttribute('data-theme', 'light');
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(outputDir, 'mobile_initial_light.png') });
  console.log('Saved mobile_initial_light.png');

  const menuBtnLight = await page.$('.menu-toggle');
  if (menuBtnLight) {
    await menuBtnLight.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'mobile_menu_open_light.png') });
    console.log('Saved mobile_menu_open_light.png');

    await menuBtnLight.click();
    await new Promise(r => setTimeout(r, 400));
  }

  await page.evaluate(() => {
    window.scrollTo(0, 1000);
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, 'mobile_scrolled_light.png') });
  console.log('Saved mobile_scrolled_light.png');

  await browser.close();
}

verify().catch(console.error);
