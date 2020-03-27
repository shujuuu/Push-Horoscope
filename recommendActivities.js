const puppeteer = require('puppeteer');

async function scrapeAct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    //what to scrape
    let auspicious = '//*[@id="bgaus"]';
    let inauspicious = '//*[@id="bgausbad"]';



    let hrRat = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[1]/div[3]';
    let hrOx = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[2]/div[3]';
    let hrTiger = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[3]/div[3]';
    let hrRabbit = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[4]/div[3]';
    let hrDragon = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[5]/div[3]';
    let hrSnake = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[6]/div[3]';
    let hrHorse = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[7]/div[3]';
    let hrGoat = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[8]/div[3]';
    let hrMonkey = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[9]/div[3]';
    let hrRooster = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[10]/div[3]';
    let hrDog = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[11]/div[3]';
    let hrPig = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[12]/div[3]';
    // let hrHai = '//*[@id="allwrappstart"]/div[4]/div[3]/div/div[2]/div[2]/div[3]/text()';
    //$x = puppeteer selector to select item on page with xpath
    //xpath = navigate to page, like jquery; works well with web scraper; prefix with slashes//
    //will return array
    //[elGood] = pulling out the first element of the array; destructuring
    const [elGood] = await page.$x(auspicious);
    const txtG = await elGood.getProperty('textContent');
    const rawTxtG = await txtG.jsonValue();

    const [elBad] = await page.$x(inauspicious);
    const txtB = await elBad.getProperty('textContent');
    const rawTxtB = await txtB.jsonValue();

    const [elRat] = await page.$x(hrRat);
    const txtRat = await elRat.getProperty('textContent');
    const rawTxtRat = await txtRat.jsonValue();

    const [elOx] = await page.$x(hrOx);
    const txtOx = await elOx.getProperty('textContent');
    const rawTxtOx = await txtOx.jsonValue();

    const [elTiger] = await page.$x(hrTiger);
    const txtTiger = await elTiger.getProperty('textContent');
    const rawTxtTiger = await txtTiger.jsonValue();

    const [elRabbit] = await page.$x(hrRabbit);
    const txtRabbit = await elRabbit.getProperty('textContent');
    const rawTxtRabbit = await txtRabbit.jsonValue();

    const [elDragon] = await page.$x(hrDragon);
    const txtDragon = await elDragon.getProperty('textContent');
    const rawTxtDragon = await txtDragon.jsonValue();

    const [elSnake] = await page.$x(hrSnake);
    const txtSnake = await elSnake.getProperty('textContent');
    const rawTxtSnake = await txtSnake.jsonValue();

    const [elHorse] = await page.$x(hrHorse);
    const txtHorse = await elHorse.getProperty('textContent');
    const rawTxtHorse = await txtHorse.jsonValue();

    const [elGoat] = await page.$x(hrGoat);
    const txtGoat = await elGoat.getProperty('textContent');
    const rawTxtGoat = await txtGoat.jsonValue();

    const [elMonkey] = await page.$x(hrMonkey);
    const txtMonkey = await elMonkey.getProperty('textContent');
    const rawTxtMonkey = await txtMonkey.jsonValue();

    const [elRooster] = await page.$x(hrRooster);
    const txtRooster = await elRooster.getProperty('textContent');
    const rawTxtRooster = await txtRooster.jsonValue();

    const [elDog] = await page.$x(hrDog);
    const txtDog = await elDog.getProperty('textContent');
    const rawTxtDog = await txtDog.jsonValue();

    const [elPig] = await page.$x(hrPig);
    const txtPig = await elPig.getProperty('textContent');
    const rawTxtPig = await txtPig.jsonValue();

    const result = {
        goodAct: rawTxtG,
        badAct: rawTxtB,
        hours: [
            rawTxtRat,
            rawTxtOx,
            rawTxtTiger,
            rawTxtRabbit,
            rawTxtDragon,
            rawTxtSnake,
            rawTxtHorse,
            rawTxtGoat,
            rawTxtMonkey,
            rawTxtRooster,
            rawTxtDog,
            rawTxtPig
        ]
    }
    // console.log(result);
    browser.close();
    return result;
}

scrapeAct('http://www.dragon-gate.com/tool/almanac/').then(response => {
    console.log(response);
    console.log('sent with love from promise')
});
// console.log(result)