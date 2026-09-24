import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://localhost:3000';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1200'],
    defaultViewport: { width: 1440, height: 1200 },
  });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.querySelector('.tfl')?.setAttribute('data-theme', 'dark');
  });
  await new Promise(r => setTimeout(r, 600));

  const whoEl = await page.$('#who');
  if (whoEl) {
    await whoEl.screenshot({ path: path.join(__dirname, 'who_dark_before.png') });
    console.log('Saved who_dark_before.png');
  }

  const workEl = await page.$('#work');
  if (workEl) {
    await workEl.screenshot({ path: path.join(__dirname, 'work_dark_before.png') });
    console.log('Saved work_dark_before.png');
  }

  await page.screenshot({ path: path.join(__dirname, 'full_dark_before.png'), fullPage: true });
  console.log('Saved full_dark_before.png');

  await browser.close();
}

capture().catch(console.error);
