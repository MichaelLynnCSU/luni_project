import puppeteer from "puppeteer";
import getAnswersFromGPT from "./referResumeAndAnswer.js";


const fillWorkableForm = async (link, resumeData, data) => {
    // const browser = await puppeteer.launch({ headless: "new" }) // TODO: Use for production only
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    // Production-only
    // await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")

    // Navigate the page to a URL
    try {
        await page.goto(`https://jobs.workable.com${link}`);

        //Bring up the form
        const formButton = await page.$("[data-ui='overview-apply-now']")
        await formButton.click()
        await new Promise(r => setTimeout(r, 2000));

        // Get rid of the cookie dialog
        const cookieButton = await page.waitForSelector("[data-ui='cookie-consent-accept']")
        await cookieButton.click()

        // Start filling out the form
        const firstName = await page.$("[data-ui='firstname']")
        const lastName = await page.$("[data-ui='lastname']")
        const email = await page.$("[data-ui='email']")

        await firstName.type(data.firstName)
        await lastName.type(data.lastName)
        await email.type(data.email)

        try {
            //* Change the country code first
            let phone = await page.waitForSelector("[name='phone']", { timeout: 3000 })
            phone = await page.$("[name='phone']")
            await phone.type("+971")
            await phone.type("")
            // Now let's put in the phone number
            await phone.type(data.phone)
        } catch (e) {
            // The field probably doesn't exist
        }

        for (const exp of data.experience) {
            try {
                let addButton = await page.waitForSelector("[aria-label='Add Experience']", { timeout: 3000 })
                addButton = await page.$("[aria-label='Add Experience']")
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
            } catch (e) {
                // Field doesn't exist
                break
            }
        }

        for (const ed of data.education) {
            try {
                let addButton = await page.waitForSelector("[aria-label='Add Education']", { timeout: 3000 })
                addButton = await page.waitForSelector("[aria-label='Add Education']")
                await addButton.click()
                const school = await page.waitForSelector("[name='school']")
                const fieldOfStudy = await page.waitForSelector("[name='field_of_study']")
                const degree = await page.waitForSelector("[name='degree']")
                await school.type(ed.school)
                await fieldOfStudy.type(ed.fieldOfStudy)
                await degree.type(ed.degree)
                await page.keyboard.press("Tab")
                await page.keyboard.press("Tab")
                await page.keyboard.press("Tab")
                await page.keyboard.press("Enter")
                await new Promise(r => setTimeout(r, 500));
            } catch (e) {
                // Field doesn't exist
                break
            }
        }

        // Upload the resume
        const resumeInput = await page.waitForSelector("[data-ui='resume']")
        //replace to get PDF from user
        await resumeInput.uploadFile("./Moamen_Resume.pdf")

        const sections = await page.$$("[data-ui='section']")
        const fields = await sections[2].$$(".styles__field--3JEd1")
        const questions = [] // Array containing the specific questions

        // Get the specific questions from the form
        for (const field of fields) {
            let questionElem = await (await field.waitForSelector("strong.styles__strong--2kqW6")).getProperty("innerText")
            let q = questionElem.toString().replace("JSHandle:", "")
            if (q === "*") { // That's the asterisk for the required question, we need the label for the input field instead
                questionElem = await (await field.$$("strong.styles__strong--2kqW6"))[1].getProperty("innerText")
                q = questionElem.toString().replace("JSHandle:", "")
            }

            let textarea = await field.$("textarea")
            let yesno = await field.$("[data-ui='option']")
            let radio = await field.$("input[type='radio']")

            let optionsArray = await field.$$("label span")
            let options = []
            if (radio) {
                for (const option of optionsArray) {
                    const text = (await option.getProperty("innerText")).toString().replace("JSHandle:", "")
                    options.push(text)
                }
            }

            questions.push({
                question: q,
                type: textarea ? "text" : yesno ? "yes/no" : radio ? "radio-button" : null,
                options: radio ? options : null
            })
        }

        let i = 0
        const response = await getAnswersFromGPT(questions, resumeData)
        console.log(response)
        // Now answer each of the questions, one by one
        for (const field of fields) {

            let textarea = await field.$("textarea")
            let yesno = await field.$("[data-ui='option']")
            let radio = await field.$("input[type='radio']")

            if (textarea) {
                // It's a text-based answer, just type in the answer here
                await textarea.type(response[i].answer)
                await page.keyboard.press("Tab")
            }

            if (yesno) {
                // It's a yes or no question, click the option accordingly
                await page.keyboard.press("Space")
                if (response[i].answer === "yes" || response[i].answer === "YES") {
                    console.log("clicking yes")
                    await new Promise(r => setTimeout(r, 1000));
                } else {
                    console.log("clicking no")
                    await page.keyboard.press("ArrowRight")
                    await new Promise(r => setTimeout(r, 1000));
                }
                await page.keyboard.press("Tab")
            }

            if (radio) {
                // It's an MCQ question
                let optionsArray = await field.$$("label span")
                for (const option of optionsArray) {
                    const text = (await option.getProperty("innerText")).toString().replace("JSHandle:", "")
                    if (response[i].answer === text) {
                        await option.click()
                        await new Promise(r => setTimeout(r, 1000));
                    }
                }
                await page.keyboard.press("Tab")
            }
            i = i + 1
        }

        // Finally submit the form
        const submitButton = await page.waitForSelector("[data-ui='application-form-submit']")
        const clicked = await submitButton.click();

        if (clicked) {
            console.log('Workable Submit button clicked successfully');
        } else {
            console.log('Workable submit button click failed');
        }
        await new Promise(r => setTimeout(r, 30000)); // A 30-second wait so you can check if everything worked fine

        await browser.close()
        return "done"
    } catch (e) {
        console.log(e)
        return {error: JSON.stringify(e)}
    }
}

export default fillWorkableForm;