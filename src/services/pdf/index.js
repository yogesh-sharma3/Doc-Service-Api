const path = require("path");
var fs = require('fs');
const PDFDocument = require('pdfkit');
const { getUrl, getName } = require('../../utilities');



const uplodedfile = path.resolve(__dirname, "..", "..", "..", "data", "pdf")
const imagpdf = path.resolve(__dirname, '..', '..', '..', 'data', 'img');

/**
 * Pdf
 * 
 * @param {object} body
 * 
 */


const textpdf = function (stringData, newName) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(uplodedfile + `/` + `${newName}`));
    doc.fontSize(25)
        .text(stringData, 100, 100);
    doc.end()
}

const imgpdf = function (finalName) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(uplodedfile + `/` + `${finalName}.pdf`));
    doc.image(imagpdf + `/${finalName}.png`, {
        fit: [250, 300],
        align: 'center',
        valign: 'center'
    });
    doc.end();
}


module.exports = (body, file) => {
    return new Promise((resolve, reject) => {
        let newName;
        let userdata = body.payload
        const imgcheck = file
        const stringData = JSON.stringify(userdata);
        const name = body.name || getName();
        const filename = `${name}.pdf`;
        if (imgcheck) {
            const orginalUploadFile = file.path;
            const newFileName = file.destination + "/" + file.originalname;
            const finalName = path.parse(newFileName);
            fs.copyFile(orginalUploadFile, newFileName, function (err) {
                if (err) {
                    reject("Error renaming the file")
                }
                fs.unlink(orginalUploadFile, function (err) {
                    reject("Error deleting a file")
                });
                imgpdf(finalName.name)
                const url = getUrl();
                resolve({
                    pdf : `${url}/pdf/${finalName.name}.pdf` 
                });
            });
        } else {
            textpdf(stringData, filename);
            const url = getUrl();
            resolve({
                pdf : `${url}/pdf/${filename}` 
            });
        }
    })
}
