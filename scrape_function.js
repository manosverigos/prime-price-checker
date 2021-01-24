const puppeteer = require('puppeteer');
const data = require('./urls.js');

async function check(shop_name, url, class_name) {

  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  const navigationPromise = page.waitForNavigation({
    waitUntil: "domcontentloaded"
  });

  await page.goto(url);
  await navigationPromise;

  try {
    const waitOptions = {
      timeout: 5000
    }
    await page.waitForSelector(class_name, waitOptions);

    const element = await page.$(class_name);
    const price = await page.evaluate(element => element.textContent, element);

    let result = {
      name: shop_name,
      price: price
    }
    await browser.close();

    return result
  } catch {
    
    return {
      name: shop_name,
      price: 'NA'
    }
  }
}

async function forLoop(barcode) {
  let scrape_data = data.scrape_list(barcode);
  let results = [];
  for (shop of scrape_data) {
    let shop_name = shop.name;
    let url = shop.url;
    let class_name = shop.class;
    result = await check(shop_name, url, class_name);
    results.push(result);
  }
  return results
}
module.exports.forLoop = forLoop;