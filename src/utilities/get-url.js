const config = helper.config;


function getUrl(){
    return `${config.PROTOCOL}${config.SERVICE_URL}${config.MOUNT_POINT}`
}

module.exports = getUrl;