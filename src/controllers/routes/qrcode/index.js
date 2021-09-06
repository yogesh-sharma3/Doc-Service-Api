const helper = global.helper;
const express = helper.module.express;
const router = express.Router();
const services = require('../../../services');
const middlewares = require('../../../middlewares');
const { safePromise } = require('../../../utilities');
const {qrcode:rules} = require('../../../../rules');
const qrcode = services.qrcode;
const HOST=process.env.HOST
const validate = middlewares.validate;
const sanitize = middlewares.sanitize;
const isAuthorized = middlewares.isAuthorized;


router.post('/qrcode',isAuthorized, sanitize, validate(rules), async (req, res) => {
    const body = req.payload
    const [error, result] = await safePromise(qrcode(body)) 
    if(error){
        return res.json({
            success:false,
            error: error.message
        });
    }
    res.json({
        success:true,
        message: "QR-code generated!!!",
        res:{
            ...result
        }
    })
});

module.exports = router;