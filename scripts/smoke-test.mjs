import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:3001';
const ROUTES = ['/', '/catalog', '/product/12345'];

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const route of ROUTES) {
    const page = await context.newPage();
    const logs = [];
    page.on('console', msg => logs.push({ type: msg.type(), text: msg.text() }));
    page.on('pageerror', err => logs.push({ type: 'pageerror', text: err.message }));

    const url = BASE + route;
    console.log('\n=== Visiting:', url, '===');
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(e => {
      console.error('Navigation error:', e.message);
      return null;
    });

    if (response) {
      console.log('Status:', response.status());
      console.log('Content-Type:', response.headers()['content-type'] || 'n/a');
    } else {
      console.log('No response (timeout or network error)');
    }

    // Wait a short while to collect any async console errors
    await page.waitForTimeout(1000);

    if (logs.length === 0) {
      console.log('Console: (no logs)');
    } else {
      console.log('Console logs:');
      for (const l of logs) {
        console.log(' -', l.type, ':', l.text);
      }
    }

    await page.close();
  }

  await browser.close();
}

run().catch(err => {
  console.error('Smoke test failed:', err);
  process.exit(1);
});
