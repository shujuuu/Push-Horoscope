const puppeteer = require('puppeteer')

async function scrape() {
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()

    await page.goto('http://www.dragon-gate.com/tool/almanac/index.php?offset=240')

    const result = await page.evaluate(() => {
        const anigood = document.querySelector('.anigood').innerTxt;
        // const lightInTheAtticSelector = '#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img'
        // await page.click(lightInTheAtticSelector)
        // await page.waitFor(1000)

        ///#content_inner > article > div.row > div.col-sm-6.product_main > h1/
        // let title = document.querySelector('h1').innerText
        // let price = document.querySelector('.price_color').innerText

        return {
            anigood
        }

    })

    browser.close()
    return result
}

scrape().then((value) => {
    console.log(value) // Success!
})