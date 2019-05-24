const user = {
    username: "david.torroija@knowbly.com",
    pwd: "Open$123"
};

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
        "http://learn.knowblyhost.local:8080/cc/preview/5ce37346bd635f00828f2bdc/5ce37345bd635f00828f2bdb"
    );
    await page.waitForSelector("div.view input[type=text]");
    await page.click("input[type=text]");
    await page.type("input[type=text]", user.username);
    await page.click("input[type=password]");
    await page.type("input[type=password]", user.pwd);
    await page.waitForSelector(".kds-land");

    await page.click("button");
    await page.screenshot({
        path: `./screenshots/screenshot-${Date.now()}-.png`
    });

    await page.waitForSelector(".kcp-course-content");
    await page.waitForSelector(".kds-overlay-loader", {
        hidden: true
    });
    await page.waitFor(2 * 1000);

    const screenshot = await page.evaluate(async () => {
        //block-5ce37344bd635f00828f2bd7
        const block = {
            id: "5ce37344bd635f00828f2bd7"
        };
        const canvasElement = await html2canvas($(`#block-${block.id}`)[0], {
            windowWidth: 1100,
            // windowHeight: 300,
            // allowTaint: false,
            // logging: false,
            useCORS: true,
            // scale,
            onclone: element => {
                console.log("!!", $(element).height());
                $(element)
                    .find(".is-select")
                    .removeClass("is-select kds-card--dotted");
            }
        });

        let image = Canvas2Image.convertToImage(
            canvasElement,
            $(canvasElement).width(),
            $(canvasElement).height(),
            "png"
        );
        return image.src;
        //     return image;
        //     // Open the data string in the current window
        //     // document.location.href = imageData.replace(imageType, 'image/octet-stream');
        // });
    })
    // console.log("hola", screenshot);
    var fs = require('fs');
    // strip off the data: url prefix to get just the base64-encoded bytes
    var data = screenshot.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile(`./screenshots/block-${Date.now()}-.png`, buf);
    await page.waitFor(60 * 1000);
    await browser.close();
})();