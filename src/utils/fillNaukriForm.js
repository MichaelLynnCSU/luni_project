const puppeteer = require('puppeteer');
const data = require('./userDataObject'); // Optional, only if you wanna test out the function

const fillNaukriForm = async (userData) => {
    // const browser = await puppeteer.launch({ headless: "new" }) // TODO: Use for production only 
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    // Production-only
    // await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")

    // Navigate the page to a URL
    await page.goto('https://www.naukrigulf.com/real-estate-consultant-jobs-in-dubai-uae-in-rfz-real-estate-llc-1-to-2-years-n-cd-236856-jid-261223000062');

    // Getting the title of the position - this will be used to populate the designation field in the form
    const h1 = await (await page.waitForSelector("h1.info-position")).evaluate(h1 => h1.textContent)

    const applyButton = await page.waitForSelector(".ng-btn.jd-button.white")
    await applyButton.click()
    await new Promise(r => setTimeout(r, 2000));

    // Getting the fields
    const fullName = await page.waitForSelector("[name='unrName']")
    const email = await page.waitForSelector("[type='email']")
    const location = await page.waitForSelector("[name='currC']")

    await fullName.type(`${data.firstName} ${data.lastName}`) // String formatting to put first name and last name together
    await email.type(data.email)

    // Checks data object for gender and clicks the correct label accordingly
    if (data.gender.toLowerCase() === "male") {
        const selector = await page.waitForSelector("label[for='gender0']")
        await selector.click()
    } else {
        const selector = await page.waitForSelector("label[for='gender1']")
        await selector.click()
    }

    await location.type(data.city)
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("Enter")

    // Setting nationality to Emirati
    const nationality = await page.waitForSelector("[name='unrNationality']")
    await nationality.type(data.nationality)
    await page.keyboard.press("Enter")

    //Type in experience
    const xpYears = await page.waitForSelector("#totalYears")
    const xpMonths = await page.waitForSelector("#totalMonths")
    await xpYears.type(data.experiencePeriod)
    await xpMonths.type("0")

    // Type in salary
    const dropdown = await page.waitForSelector("input#currency")
    await dropdown.click()
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("ArrowDown") // 6 clicks to reach the "UAE Dirhams" option
    await page.keyboard.press("Enter")
    const salary = await page.waitForSelector("input#salary")
    await salary.type(data.monthlySalary)

    // Type in designation
    //TODO: Might need some work here, sometimes it doesn't get filled as expected
    const designation = await page.waitForSelector("input#designation")
    await designation.type(h1)
    await page.keyboard.press("ArrowDown")
    await new Promise(r => setTimeout(r, 200));
    await page.keyboard.press("Enter")

    // Now upload the CV
    const fileUpload = await page.waitForSelector("#cvAttachment")
    await fileUpload.uploadFile("./SalmaNegmResume.pdf")

    await new Promise(r => setTimeout(r, 10000));

    await browser.close()
}

export { fillNaukriForm }