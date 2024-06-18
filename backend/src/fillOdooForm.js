// Import puppeteer-extra and the stealth plugin
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

//
puppeteer.use(StealthPlugin());

const fillOdooForm = async (link, userData) => {
    // const browser = await puppeteer.launch({ headless: "new" }) // TODO: Use for production only
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    try {
        await page.goto(link)
        await new Promise(r => setTimeout(r, 5000)); //  Wait for 5 seconds

        const name = await page.waitForSelector("[name='partner_name']")
        const email = await page.waitForSelector("[name='email_from']")
        const phone = await page.waitForSelector("[name='partner_mobile']")
        const linkedIn = await page.waitForSelector("[name='linkedin_profile']")
        const submit = await page.waitForSelector(".s_website_form_send") // Submit button

        // Fill in the name
        await name.type(`${userData.firstName} ${userData.lastName}`)

        // Fill in the email address
        await email.type(userData.email)

        // Fill in the phone number
        await phone.focus()
        await page.keyboard.down("ControlLeft")
        await page.keyboard.press("A")
        await page.keyboard.up("ControlLeft")
        await phone.type(`+971 ${userData.phone}`)

        // Type in the link to the LinkedIn profile
        await linkedIn.type(userData.linkedIn)

        await submit.click() // TODO: Uncomment this to submit the form

        await new Promise(r => setTimeout(r, 5000)); //  Wait for 5 seconds
        await browser.close()

        return true
    } catch (e) {
        return JSON.stringify(e)
    }
}

export default fillOdooForm;

// fillOdooForm("https://www.odoo.com/fr_FR/jobs/apply/account-executive-dubai-412", {
//     firstName: "Amith",
//     lastName: "Chalil",
//     email: 'amithchalil@gmail.com',
//     phone: "5555555",
//     linkedIn: 'https://linkedin.com/in/amith-chalil'
// })