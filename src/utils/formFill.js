//4 sources
// Nukarigulf easy applies (no registration required)
//

const fillWorkableForm = async (linkFromScrapedObject) => {
    // const browser = await puppeteer.launch({ headless: "new" }) // TODO: Use for production only 
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    // Production-only
    // await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")

    // * Sample user data object
    const data = {
        firstName: "Moamen",
        lastName: "Ahmed",
        email: "almoamen.ahmd@gmail.com",
        phone: "556386363",
        education: [
            {
                school: "American University of Sharjah",
                degree: "Bachelor of Science",
                fieldOfStudy: "Electrical Engineering"
            }
        ],
        experience: [
            {
                title: "Customer Development Executive",
                company: "Mars Wrigley",
                summary: "Handling 15 key accounts across Digital, Vending, food service and non-grocery retail with annual target of $3,250,000 USD. Responsible for a team of 11 sales representatives (credit vans), 2 merchandisers and one collector in the Digital, New Transactions and Petrol channel for all Mars categories (Chocolate, Pet Care & Ice Cream)"
            },
            {
                title: "Sales Specialist & Analyst",
                company: "Fandom",
                summary: "Conduct Market Research to identify sales opportunities. Set up meetings with potential clients and listen to their wishes and concerns. Visiting stores to ensuring proper display of items and suggest improvements."
            },
        ]
    }

    // Navigate the page to a URL
    await page.goto('https://jobs.workable.com/view/mPGQQxq3fid81iitgUGKMn/interior-designer---ffe-(furniture-specialist)-in-ras-al-khaimah-at-rak-real-estate');

    //Bring up the form
    const formButton = await page.$("[data-ui='overview-apply-now']")
    await formButton.click()
    await new Promise(r => setTimeout(r, 2000));

    // Start filling out the form
    // * First get the fields
    const firstName = await page.$("[data-ui='firstname']")
    const lastName = await page.$("[data-ui='lastname']")
    const email = await page.$("[data-ui='email']")
    const phone = await page.$("[name='phone']")

    await firstName.type(data.firstName)
    await lastName.type(data.lastName)
    await email.type(data.email)

    //TODO: Supposed to be changing the country code for the phone number, that didn't work apparently
    const countryCodeSelector = await page.$(".iti__flag-container")
    await countryCodeSelector.click()
    await page.keyboard.press("u")
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("Enter")

    await phone.type(data.phone)

    for (const exp of data.experience) {
        const addButton = await page.$("[aria-label='Add Experience']")
        await addButton.click()

        const title = await page.$("[name='title']")
        const company = await page.$("[name='company']")
        const summary = await page.$("[name='summary']")

        await title.type(exp.title)
        await company.type(exp.company)
        await summary.type(exp.summary)

        const saveButton = await page.$("[data-ui='save-section']")
        await saveButton.click()
        await new Promise(r => setTimeout(r, 500));
    }

    // TODO: Something's wrong here, need to troubleshoot it further
    // // Moving onto education
    // for (const ed of data.education) {
    //     const addButton = await page.$("[aria-label='Add Education']")
    //     await addButton.click()
    //     const school = await page.$("[name='school']")
    //     const fieldOfStudy = await page.$("[name='field_of_study']")
    //     const degree = await page.$("[name='degree']")
    //     await school.type(ed.school)
    //     await fieldOfStudy.type(ed.fieldOfStudy)
    //     await degree.type(ed.degree)
    //     const saveButton = await page.$("[data-ui='save-section']")
    //     await saveButton.click()
    //     await new Promise(r => setTimeout(r, 500));
    // }

    const sections = await page.$$("[data-ui='section']")
    const fields = await sections[2].$$(".styles__field--3JEd1")

    // Check each field for different elements to answer appropriately
    for(const field of fields) {
        const elem = await field.$("[data-ui='option']")
        if(elem) {
            // It's a YES/NO question
            await elem.click()
            continue
        }
    }
    for(const field of fields) {
        const radio = await field.$("[type='radio']")
        if(radio) {
            // It's a multiple choice question
            await radio.click()
            continue
        }
    }
    for(const field of fields) {
        const txtarea = await field.$("textarea")
        if(txtarea) {
            // If It's a long form answer (one that will require gpt4 )
            await txtarea.type("This is a dummy value")
            continue
        }
    }

    await new Promise(r => setTimeout(r, 10000)); // A 10-second wait so you can check if everything worked fine

    await browser.close()
}

export { fillWorkableForm }