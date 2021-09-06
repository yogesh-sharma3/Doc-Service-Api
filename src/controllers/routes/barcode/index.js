const helper = global.helper;
const express = helper.module.express;
const router = express.Router();
const services = require('../../../services');
const { safePromise } = require('../../../utilities');
const middlewares = require('../../../middlewares');
const {qrcode:rules} = require('../../../../rules');
const validate = middlewares.validate;
const sanitize = middlewares.sanitize;
const isAuthorized = middlewares.isAuthorized;

const barcode = services.barcode

router.post('/barcode',isAuthorized,sanitize, validate(rules),async (req, res, next) => {
    const body = req.payload
    const [error, result] = await safePromise(barcode(body))     
    if(error){
        return res.json({
            success:false,
            error: error.message
        });
    }
    res.json({
        success:true,
        message: "Barcode generated!!!",
        res:{
            ...result
        }
    })
    
});


module.exports = router;