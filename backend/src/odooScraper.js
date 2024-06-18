import puppeteer from 'puppeteer'

const scrapeFromOdoo = async () => {
    // const browser = await puppeteer.launch({ headless: "new" }) // TODO: Use for production only
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    let listings = []

    await page.goto("https://www.odoo.com/en_EN/jobs?office_id=7749621")
    await new Promise(r => setTimeout(r, 4000));

    const cards = await page.$$(".card")
    for (const card of cards) {
        let listing = {
            title: "",
            link: ""
        }
        const title = await card.$("h3")
        const link = await card.$("a")
        if(title && await title.getProperty("innerText")) {
            listing.title = await (await title.getProperty("innerText")).jsonValue()
            listing.link = `${await (await link.getProperty("href")).jsonValue()}`
            listings.push(listing)
        }
    }

    console.log(listings)

    await browser.close()
    return listings
}
scrapeFromOdoo();

export default scrapeFromOdoo;