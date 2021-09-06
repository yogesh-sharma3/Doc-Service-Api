const QRCode = require('qrcode')
const path = require("path");

const { getUrl, getName } = require('../../utilities');

/**
 * QRCode
 * 
 * @param {object} body
 * 
 */

module.exports = function (body) {
    return new Promise((resolve, reject) => {
        const payload = body.payload;
        const name = body.name || getName();
        const filename = `${name}.png`;
        const writefile = path.resolve(__dirname, "..", "..", "..", "data", "qrcode", filename);
        let data = payload;
        if(typeof payload === 'object'){
            data = JSON.stringify(payload); 
        }  
        QRCode.toFile(writefile, data, {
            color: body.color || {
                dark: '#000000',
                light: '#ffffff'
            }
        }, function (err) {
            if (err) {
                return reject(err);
            }
            const url = getUrl();
            resolve({
                qrcode : `${url}/qrcode/${filename}` 
            });
        })  
    })
}
