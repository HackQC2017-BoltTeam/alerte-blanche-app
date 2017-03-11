var CONSTANTS = {
    SERVER_URL: 'http://10.128.166.151:5000'
};

var URL = {
    photo: CONSTANTS.SERVER_URL + '/photo',
    parkings: CONSTANTS.SERVER_URL + '/parkings',
};

module.exports = {
    Constants: CONSTANTS,
    Url: URL
};
