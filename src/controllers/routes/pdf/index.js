const helper = global.helper;
const express = helper.module.express;
const router = express.Router();
const services = require('../../../services');
const middlewares = require('../../../middlewares');
const { safePromise } = require('../../../utilities');
const {pdf:rules} = require('../../../../rules');
const path = require("path");
const multer = require('multer');
const pdf = services.pdf
const validate = middlewares.validate;
const sanitize = middlewares.sanitize;
const isAuthorized = middlewares.isAuthorized;

const uploadPath = path.resolve(__dirname, "..", "..", "..", "..", "data", "img");

var upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            return cb('Only .png, .jpg and .jpeg format allowed!', false);
        }
    }
})

let fileupload = upload.single('image')

router.post('/pdf',isAuthorized,sanitize,validate(rules),(req, res, next) => {
    
    fileupload(req, res, async function (err) {
        if (err) {
            return res.json({
                Success: false,
                message: err,
            })
        }
        const body = req.payload;
        const file = req.file;
        const HOST = process.env.HOST
        if (file || !(Object.keys(body).length === 0)) {
            if (body.payload || file) {
                const data = body
                const [error, result] = await safePromise(pdf(data,file))   
                if(error){
                    return res.json({
                        success:false,
                        error: error.message
                    });
                }  
                res.json({
                    success:true,
                    message: "Pdf generated!!!",
                    res:{
                        ...result
                    }
                })   
            } else {
                res.json({
                    Success: false,
                    message: 'Please enter data in payload key',
                });
            }
        } else {
            res.json({
                Success: false,
                message: 'Please upload a image file or enter payload',
            });
        }
    })
});





module.exports = router;