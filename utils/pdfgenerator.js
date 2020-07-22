const pdfMakePrinter = require('pdfmake/src/printer');
const path = require('path')
const pdfmake = require('pdfmake')

// pdfmake.fonts = {
//   'Roboto' : {
//      normal: 'Roboto-Regular.ttf',
//      bold: 'Roboto-Medium.ttf',
//      italics: 'Roboto-Italic.ttf',
//      bolditalics: 'Roboto-Italic.ttf'
//   },

//   'OpenSans' : {
//      normal: 'OpenSans-Regular.ttf',
//      bold: 'OpenSans-Medium.ttf',
//      italics: 'OpenSans-Italic.ttf',
//      bolditalics: 'OpenSans-Italic.ttf'
//   }

// }
const fonts = {
  Roboto: {
      normal:  './fonts/Roboto-Regular.ttf',
      bold: './fonts/Roboto-Medium.ttf',
      italics: './fonts/Roboto-Italic.ttf',
      bolditalics: './fonts/Roboto-MediumItalic.ttf'
  }
};
// var printer = new PdfPrinter(fonts);
const  generatePdf = (docDefinition, callback) => {
    return new Promise((resolve, reject)=>{
        try {
            // const fontDescriptors = { ... };
            const printer = new pdfMakePrinter(fonts);
            const doc = printer.createPdfKitDocument(docDefinition);
            
            let chunks = [];
        
            doc.on('data', (chunk) => {
              chunks.push(chunk);
            });
          
            doc.on('end', () => {
              const result = Buffer.concat(chunks);
              resolve({status:'success', data:'data:application/pdf;base64,' + result.toString('base64')})
            });
            
            doc.end();
            
          } catch(err) {
            resolve({status:'failure', error:err})
          }
    })
  
};

module.exports = generatePdf;