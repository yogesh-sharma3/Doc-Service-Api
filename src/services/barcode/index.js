const bwipjs = require("bwip-js");
const path = require('path');
const fs = require('fs');
const { getUrl, getName } = require('../../utilities');


/**
 * Barcode
 * 
 * @param {object} body
 * 
 */


module.exports = (body) => {
    return new Promise((resolve, reject) => {
        const payload = body.payload;
        const name = body.name || getName();
        const filename = `${name}.png`;
        let data;
        if (payload) {
            data = payload
            if (typeof (payload) === 'object') {
                data = JSON.stringify(payload);
            }
        }
        const writefile = path.resolve(__dirname, "..", "..", "..", "data", "barcode",filename);
        bwipjs.toBuffer({
                bcid: "code128",
                text: data,
                scale: 2,
                height: 10,
                includetext: true,
                textxalign: "center",
            },
            function (err, data) {
                if (err) {
                    return  reject(err)
                } else {
                    fs.writeFile(writefile, data, function (err) {
                        if (err) {
                            return  reject(err);
                        }
                        const url = getUrl();
                        resolve( {barcode : `${url}/barcode/${filename}`} );
                    });
                }
            }
        );
    })
}