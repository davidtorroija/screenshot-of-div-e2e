const user = {
    username: "david.torroija@knowbly.com",
    pwd: "Open$123"
};

const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1000,
        height: 1000
    });
    // await page.goto(
    //     "http://learn.knowblyhost.local:8080/cc/preview/5cf043e9d37ca864b9d9dba5/5cf0490da3b4126af5234b6e",
    //     { waitUntil: "networkidle0" }
    // );

    // await page.waitForSelector("div.view input[type=text]");
    // await page.click("input[type=text]");
    // await page.type("input[type=text]", user.username);
    // await page.click("input[type=password]");
    // await page.type("input[type=password]", user.pwd);
    // await page.waitForSelector(".kds-land");

    // await page.click("button");
    // // await page.waitForNavigation({ waitUntil: "networkidle0" })
    // await page.waitForSelector(".kcp-course-content");
    // await page.waitForSelector(".kcp-course-container");

    await page.goto(
        "file:///Users/davidtorroija/Library/Mobile%20Documents/com~apple~CloudDocs/docs/pepitotestingcarousell-2019-05-31-8-51-36Z-gallery-carousel-web-standard/index.html",
        { waitUntil: "networkidle0" }
    );
    await page.addScriptTag({url: 'https://html2canvas.hertzen.com/dist/html2canvas.js'});
    await page.addScriptTag({url: 'https://cdn.jsdelivr.net/npm/canvas2image@1.0.5/canvas2image.min.js'});

    // await page.waitForSelector(".kds-overlay-loader", {
    //     hidden: true
    // });
    const block = {
        idBlock: "5cee9fa94fe09162b1544efa",
        idWidget:"5cf0490da3b4126af5234b6d",
        idTitle: "5cee9fa94fe09162b1544efc"
    };

    // const isWidget = await page.evaluate(async block => {
    //     if ($(`#block-${block.idWidget} .is-widget`).length) {
    //         return true
    //     }
    //     return false;
    // }, block)

    // console.log("is Widget", isWidget)

    // if (isWidget) {
    //     await page.waitForSelector(".is-widget .loading-spinner", {
    //         hidden: true
    //     });
    // }
    // const example2 = await page.$(`#block-${block.idWidget}`);
    // const bounding_box = await example2.boundingBox();
    
    const screenshot = await page.evaluate(async (block) => {
        const canvasElement = await html2canvas($(`.kiot-media-gallery`)[0], {
            windowWidth: 1000,
            useCORS: true,
            // allowTaint: false,
            onclone: element => {
            }
        });

        let image = Canvas2Image.convertToImage(
            canvasElement,
            $(canvasElement).width(),
            $(canvasElement).height(),
            "png"
        );
        return image.src;
    }, block)
    var fs = require('fs');
    var data = screenshot.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile(`./screenshots/block-${Date.now()}-.png`, buf);
    // await page.waitFor(60000)
    await browser.close();
})();