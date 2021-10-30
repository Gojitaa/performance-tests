const lighthouse = require('lighthouse')
const puppeteer = require('puppeteer');

const opts = {
  lighthouseConfig: {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['performance'],
    },
  },
  disableNetworkThrottling: true,
  disableStorageReset: true,
  formFactor: 'mobile',
  throttlingMethod: 'provided',
  connection: 'fourg',
}

describe('App', () => {
	let browser;
	let lighthouseResponse;
	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: true,
			args: ['--disable-gpu'],
		});
		opts.port = (new URL(browser.wsEndpoint())).port;
		lighthouseResponse = await lighthouse('http://localhost:1234', opts, opts.lighthouseConfig);
	});

	afterAll(async () => {
		await browser.close()
	})

	describe('render', () => {
		it('should score 0.9 on FCP', async () => {
			expect(lighthouseResponse.lhr.audits['first-contentful-paint'].score).toBeGreaterThan(0.9)
		});

		it('should score 0.9 on LCP', async () => {
			expect(lighthouseResponse.lhr.audits['largest-contentful-paint'].score).toBeGreaterThan(0.9)
		});

		it('should score 0.9 on FID', async () => {
			expect(lighthouseResponse.lhr.audits['max-potential-fid'].score).toBeGreaterThan(0.9)
		});

		it('should become interactive in 200ms (TTI)', async () => {
			expect(lighthouseResponse.lhr.audits['interactive'].numericValue).toBeLessThan(200)
		});

		it('should block for less than 100ms (TBT)', async () => {
			expect(lighthouseResponse.lhr.audits['total-blocking-time'].numericValue).toBeLessThan(100)
		});
	});
});