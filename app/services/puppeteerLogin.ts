import { log } from "console";
import puppeteer from "puppeteer";

interface IntefaceForBodyLogIn {
  email: string;
  password: string;
}

export async function PuppeteerLogin(body: IntefaceForBodyLogIn) {
  console.log("[0]");
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-setuid-sandbox", "--incognito", "--no-sandbox"],
    slowMo: 100,
  });
  const page = (await browser.pages())[0];
  await page.goto("https://mail.google.com/");
  await page.evaluate(() => {
    sessionStorage.clear();
  });
  await typeMail(body.email);

  const tryButton = await page.evaluate(() => {
    let el = document.querySelector("#next");
    return el ? el.innerText : "";
  });
  if (tryButton !== "") {
    await page.focus("a[class='WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb']");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);
    let element = await page.evaluate(() => {
      let data = [];
      let elements = document.querySelector(".header__aside__buttons");
      console.log(elements);
      for (var element of elements.children) {
        data.push(element.getAttribute("href"));
      }
      return data;
    });
    await page.goto(`${element[1]}`);
    await typeMail(body.email);
    await page.waitForTimeout(3000);
  }

  await typePassword(body.password);

  const currentURL = await page.url();

  if (currentURL == "https://gds.google.com/") {
    await page.click('span[class="VfPpkd-vQzf8d"]');
  }

  const emailsList = await parseMail();

  await browser.close();
  return emailsList;
}
async function typeMail(mail: string): void {
  await page.waitForSelector("#identifierId");
  await page.waitForTimeout(1500);
  await page.keyboard.type(`${mail}`, { delay: 100 });
  await page.waitForTimeout(1000);
  await page.keyboard.press("Enter");
}

async function typePassword(password: string): void {
  await page.waitForSelector("input[name=Passwd]");
  await page.keyboard.type(`${password}`, { delay: 300 });
  await page.waitForTimeout(1000);
  await page.keyboard.press("Enter");
}

async function parseMail() {
  const mails = await page.evaluate(() => {
    let emails = [];
    let list = document.querySelector(".afn");

    for (let item of list) {
      emails.push(item.innerText);
    }
    return emails;
  });
}
