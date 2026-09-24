import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTIFACTS_DIR = __dirname;

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://localhost:3000';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  console.log('Navigating to', URL);
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500)); // let animations settle

  // --- Light mode screenshot ---
  const lightPath = path.join(ARTIFACTS_DIR, 'hero_light.png');
  await page.screenshot({ path: lightPath, fullPage: false });
  console.log('Light screenshot saved:', lightPath);

  // Also dump computed styles for hero + text readability check
  const lightStats = await page.evaluate(() => {
    const hero = document.querySelector('.hero, [class*="hero"], section, header');
    const h1   = document.querySelector('h1');
    const p    = document.querySelector('p');
    const nav  = document.querySelector('nav a, .nav a');

    function getStyles(el) {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        text: el.textContent?.slice(0, 60),
        color: s.color,
        backgroundColor: s.backgroundColor,
        backdropFilter: s.backdropFilter || s.webkitBackdropFilter,
        background: s.background,
      };
    }

    return {
      hero: getStyles(hero),
      h1:   getStyles(h1),
      p:    getStyles(p),
      nav:  getStyles(nav),
      dataTheme: document.documentElement.getAttribute('data-theme') || document.querySelector('[data-theme]')?.getAttribute('data-theme'),
      bodyClass: document.body.className,
      tflDataTheme: document.querySelector('.tfl')?.getAttribute('data-theme'),
    };
  });
  console.log('\n--- LIGHT MODE COMPUTED STYLES ---');
  console.log(JSON.stringify(lightStats, null, 2));

  // --- Switch to dark mode ---
  await page.evaluate(() => {
    document.querySelector('.tfl')?.setAttribute('data-theme', 'dark');
  });
  await new Promise(r => setTimeout(r, 800)); // let CSS transitions settle

  const darkPath = path.join(ARTIFACTS_DIR, 'hero_dark.png');
  await page.screenshot({ path: darkPath, fullPage: false });
  console.log('\nDark screenshot saved:', darkPath);

  const darkStats = await page.evaluate(() => {
    const hero = document.querySelector('.hero, [class*="hero"], section, header');
    const h1   = document.querySelector('h1');
    const p    = document.querySelector('p');
    const nav  = document.querySelector('nav a, .nav a');

    function getStyles(el) {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        text: el.textContent?.slice(0, 60),
        color: s.color,
        backgroundColor: s.backgroundColor,
        backdropFilter: s.backdropFilter || s.webkitBackdropFilter,
        background: s.background,
      };
    }

    return {
      hero: getStyles(hero),
      h1:   getStyles(h1),
      p:    getStyles(p),
      nav:  getStyles(nav),
      dataTheme: document.documentElement.getAttribute('data-theme') || document.querySelector('[data-theme]')?.getAttribute('data-theme'),
      tflDataTheme: document.querySelector('.tfl')?.getAttribute('data-theme'),
    };
  });
  console.log('\n--- DARK MODE COMPUTED STYLES ---');
  console.log(JSON.stringify(darkStats, null, 2));

  // --- Thread / canvas check ---
  const threadCheck = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const svg    = document.querySelector('svg');
    const threads = document.querySelectorAll('[class*="thread"], [class*="Thread"], [class*="line"], [class*="Line"]');
    return {
      hasCanvas: !!canvas,
      canvasSize: canvas ? { w: canvas.width, h: canvas.height } : null,
      hasSvg: !!svg,
      threadElements: threads.length,
      threadClasses: Array.from(threads).map(t => t.className).slice(0, 5),
    };
  });
  console.log('\n--- THREAD / ANIMATION CHECK ---');
  console.log(JSON.stringify(threadCheck, null, 2));

  await browser.close();
  console.log('\nDone.');
}

run().catch(e => { console.error(e); process.exit(1); });
