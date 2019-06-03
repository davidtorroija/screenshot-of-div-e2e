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
    await page.goto(
        "http://learn.knowblyhost.local:8080/cc/preview/5cf043e9d37ca864b9d9dba5/5cf0490da3b4126af5234b6e",
        { waitUntil: "networkidle0" }
    );

    await page.waitForSelector("div.view input[type=text]");
    await page.click("input[type=text]");
    await page.type("input[type=text]", user.username);
    await page.click("input[type=password]");
    await page.type("input[type=password]", user.pwd);
    await page.waitForSelector(".kds-land");

    await page.click("button");
    // await page.waitForNavigation({ waitUntil: "networkidle0" })
    await page.waitForSelector(".kcp-course-content");
    await page.waitForSelector(".kcp-course-container");

    await page.goto(
        "http://learn.knowblyhost.local:8080/cc/preview/5cf043e9d37ca864b9d9dba5/5cf0490da3b4126af5234b6e",
        { waitUntil: "networkidle0" }
    );

    await page.waitForSelector(".kds-overlay-loader", {
        hidden: true
    });
    const block = {
        idBlock: "5cee9fa94fe09162b1544efa",
        idWidget:"5cf0490da3b4126af5234b6d",
        idTitle: "5cee9fa94fe09162b1544efc"
    };

    const isWidget = await page.evaluate(async block => {
        if ($(`#block-${block.idWidget} .is-widget`).length) {
            return true
        }
        return false;
    }, block)

    console.log("is Widget", isWidget)

    if (isWidget) {
        await page.waitForSelector(".is-widget .loading-spinner", {
            hidden: true
        });
    }
    const example2 = await page.$(`#block-${block.idWidget}`);
    const bounding_box = await example2.boundingBox();
    
    const screenshot = await page.evaluate(async (block) => {
        const canvasElement = await html2canvas($(`#block-${block.idWidget}`)[0], {
            windowWidth: 1000,
            // windowW: 700,
            // allowTaint: false,
            // logging: false,
            useCORS: true,
            // proxy: "http://learn.knowblyhost.local:2002"
            // scale: 1,
            onclone: element => {
                // $(element).replaceWith($("<div style='display: flex;align-items: center;justify-content: center;'>pepe</div>"))
                // $(element).css("marginTop", "100px")
                // $(element).css("paddingTop", "100px")
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
    await page.waitFor(60000)
    await browser.close();
})();