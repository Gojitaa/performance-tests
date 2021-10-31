const lighthouse = require('lighthouse');
const puppeteer = require('puppeteer');

const options = {
  lighthouseConfig: {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['performance'],
    },
  },
  disableNetworkThrottling: true, // throttle network
  disableStorageReset: true, // disable browser cache
  formFactor: 'mobile', // device
  connection: 'fourg', // network type
};

describe('App', () => {
	let browser;
	let lighthouseResponse;
	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: true,
			args: ['--disable-gpu'],
		});
		options.port = (new URL(browser.wsEndpoint())).port;
		lighthouseResponse = await lighthouse('http://localhost:1234', options, options.lighthouseConfig);
	});

	afterAll(async () => {
		await browser.close()
	})

	describe('render', () => {
		it('should score 0.9 on FCP', () => {
			expect(lighthouseResponse.lhr.audits['first-contentful-paint'].score).toBeGreaterThan(0.9)
		});

		it('should score 0.9 on LCP', () => {
			expect(lighthouseResponse.lhr.audits['largest-contentful-paint'].score).toBeGreaterThan(0.9)
		});

		it('should score 0.9 on FID', () => {
			expect(lighthouseResponse.lhr.audits['max-potential-fid'].score).toBeGreaterThan(0.9)
		});

		it('should become interactive in 1 sec (TTI)', () => {
			expect(lighthouseResponse.lhr.audits['interactive'].numericValue).toBeLessThan(1000)
		});

		it('should block for less than 100ms (TBT)', () => {
			expect(lighthouseResponse.lhr.audits['total-blocking-time'].numericValue).toBeLessThan(100)
		});
	});
});