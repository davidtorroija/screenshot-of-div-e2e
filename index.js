const puppeteer = require("puppeteer");
// const Canvas2Image = require("canvas2image");
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
        "https://www.w3schools.com/css/css_float.asp", {waitUntil: 'networkidle2'}
    );
    await page.waitForSelector(".w3-main");
    await page.addScriptTag({url: 'https://html2canvas.hertzen.com/dist/html2canvas.min.js'});
    await page.addScriptTag({url: 'https://cdn.jsdelivr.net/npm/canvas2image@1.0.5/canvas2image.min.js'});
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
    await page.waitFor(3000)
    const screenshot = await page.evaluate(async () => {
        console.log("html2canvas", html2canvas)
        const canvasElement = await html2canvas($(".w3-clear.w3-border.w3-padding")[0], {
            windowWidth: 1100,
            // windowHeight: 300,
            // allowTaint: false,
            // logging: false,
            useCORS: true,
            // scale,
            // onclone: element => {
            //     //example of removing something after clone to clean the image before take the screenshot
            //     const className = "w3-border"
            //     if (element.classList)
            //         element.classList.remove(className);
            //     else
            //         element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            // }
        });

        let image = Canvas2Image.convertToImage(
            canvasElement,
            canvasElement.clientHeight,
            canvasElement.clientWidth,
            "png"
        );
        console.log(image.src)
        return image.src;
    })
    await page.waitFor(30000)

    // console.log("hola", screenshot);
    var fs = require('fs');
    // strip off the data: url prefix to get just the base64-encoded bytes
    var data = screenshot.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile(`./screenshots/div-${Date.now()}-.png`, buf);
    await browser.close();
})();