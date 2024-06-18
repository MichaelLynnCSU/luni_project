import puppeteer from "puppeteer";
// In jobxdub.js


(async () => {

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('https://jobxdubai.com/');


    const links = await page.evaluate(() => {

        const anchors = document.querySelectorAll('a');
        const hrefs = [];

        for(let a of anchors) {
            if(a.href) {
                hrefs.push(a.href);
            }
        }
        const linksWithApply = hrefs.map(link => {
            return `${link}/apply`;
        });

        return linksWithApply.slice(9);
    });

    console.log(links);



// After extracting links array
    for (const link of links) {

        await page.goto(link);

        // Wait for Apply button to be visible
        const applyButton = await page.waitForSelector('button.apply-button', {visible: true});

        // Click the apply button
        await applyButton.click();

        // Wait for next page to load
        await page.waitForNavigation();

    }


    await browser.close();

   return links;

})() ;
