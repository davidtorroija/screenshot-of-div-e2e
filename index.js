const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1380,
        height: 768
    });
    await page.goto(
        "https://www.w3schools.com/css/css_float.asp"
        , {waitUntil: 'networkidle0'}
    );
    await page.waitForSelector(".w3-main");
    await page.addScriptTag({url: 'https://html2canvas.hertzen.com/dist/html2canvas.js'});
    await page.addScriptTag({url: 'https://cdn.jsdelivr.net/npm/canvas2image@1.0.5/canvas2image.min.js'});
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
    const screenshot = await page.evaluate(async () => {
        const canvasElement = await html2canvas($(".w3-main")[0], {
            windowWidth: 1100,
            useCORS: true,
        });

        let image = Canvas2Image.convertToImage(
            canvasElement,
            $(canvasElement).width(),
            $(canvasElement).height(),
            "png"
        );
        console.log(image.src)
        return image.src;
    })
    var fs = require('fs');
    // strip off the data: url prefix to get just the base64-encoded bytes
    var data = screenshot.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile(`./screenshots/div-${Date.now()}-.png`, buf);
    await page.waitFor(333333);
    await browser.close();
})();