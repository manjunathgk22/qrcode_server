const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const  QRCode = require('qrcode');
const AppConstant = require('../AppConstant');
handlebars.registerHelper('if_even', function(conditional, options) {
    if((conditional % 2) == 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
const generate = async (data)=>{
    const dataURL = await QRCode.toDataURL('hello')
    var dataBinding = {
        items: [{
            name: "item 1",
            price: 100
        },
        {
            name: "item 2",
            price: 200
        },
        {
            name: "item 3",
            price: 300
        }
        ],
        total: 600,
        isWatermark: true
    }
    if(!data){
        data = {items:[
            {
                name: 'test',
                name1: 'Table 1',
                id: '10001',
                qrcode: dataURL,
                text: `Scan Qrcode or go to `
            },
            {
                name: 'test',
                name1: 'Table 2',
                id: '10001',
                qrcode: dataURL,
                text: `Scan Qrcode or go to `
            },
            {
                name: 'test',
                name1: 'Table 3',
                id: '10001',
                qrcode: dataURL,
                text: `Scan Qrcode or go to `
            }
        ]}
    }

    var templateHtml = fs.readFileSync(path.join(process.cwd(), '/pdf/qrcodetemplate.html'), 'utf8');
    var template = handlebars.compile(templateHtml);
    var finalHtml = encodeURIComponent(template(data));
    var options = {
        format: 'A4',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "40px",
            bottom: "100px"
        },
        encoding:'base64',
        printBackground: true,
        // path: 'invoice.pdf'
    }

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
        waitUntil: 'networkidle0'
    });
    const pdf = await page.pdf(options);
    await browser.close();
    return pdf.toString('base64')
}

module.exports = generate