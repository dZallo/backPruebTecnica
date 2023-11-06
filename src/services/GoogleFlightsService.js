const { GOOGLE_FLIGHTS_URL } = require("../constants/index")

const puppeteer = require('puppeteer');

async function getFlights(from, to, startDate, endDate) {
    console.debug("getFlights")
    const browser = await puppeteer.launch({
        headless: "new"
    })

    const page = await browser.newPage()
    page.setViewport({
        width: 1600,
        height: 900
    })
    await page.setDefaultNavigationTimeout(60000);
    await page.goto(GOOGLE_FLIGHTS_URL)

    // Pass the confirmation window
    await page.waitForSelector('.Nc7WLe')
    await page.click('.Nc7WLe')

    // Get the inputs from and to
    await page.waitForSelector(".e5F5td");
    const inputs = await page.$$(".e5F5td");
    console.debug(inputs.length)

    // type "from"
    await inputs[0].click()
    await new Promise(r => setTimeout(r, 1000))
    await page.keyboard.type(from)
    await page.keyboard.press('Enter')

    // type "to"
    await inputs[1].click();
    await new Promise(r => setTimeout(r, 1000));
    await page.keyboard.type(to);
    await page.keyboard.press("Enter");


    // Get input dates
    const dateInputs = await page.$$(".j0Ppje");
    await dateInputs[4].click();
    await new Promise(r => setTimeout(r, 1000));
    await page.keyboard.type(startDate)
    await new Promise(r => setTimeout(r, 1000));
    await page.keyboard.press("Tab")
    await page.keyboard.type(endDate)

    //Press Done Button
    await new Promise(r => setTimeout(r, 1000));
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.press("Enter")
    await new Promise(r => setTimeout(r, 1000));

    const changeDates = await page.$(".I0Kcef");

    if(changeDates) {
        await changeDates.click()
    }


    // Press button Order By
    const orderByXpath = '//button[contains(span, "Ordenar por:")]'
    await new Promise(r => setTimeout(r, 2000));
    const [button] = await page.$x(orderByXpath)
    await button.click()

    // Press "Precio" option
    let priceOption = "//ul//li//span[text()='Precio']"
    await new Promise(r => setTimeout(r, 2000));
    const [priceOptionButton] = await page.$x(priceOption)
    await priceOptionButton.click()

    //get the flights
    await new Promise(r => setTimeout(r, 2000));
    await page.waitForSelector(".pIav2d")
    const flights = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll(".pIav2d"));
        const firstFiveElements = elements.slice(0, 5);

        const data = firstFiveElements.map(v => {
            const companyName = v.querySelector(".Ir0Voe .sSHqwe").textContent.trim();
            const duration = v.querySelector(".gvkrdb")?.textContent.trim()
            const airportLeave = v.querySelectorAll(".Ak5kof .sSHqwe .eoY5cb")[0]?.textContent.trim()
            const airportArrive = v.querySelectorAll(".Ak5kof .sSHqwe .eoY5cb")[1]?.textContent.trim()
            const price = v.querySelector(".U3gSDe .YMlIz > span")?.textContent.trim()
            return {
                companyName,
                duration,
                airportLeave,
                airportArrive,
                price
            };
        })
        return data;
    })

    await browser.close();

    return flights;
}


module.exports = {
    getFlights
};
