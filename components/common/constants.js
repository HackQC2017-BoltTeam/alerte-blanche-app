var CONSTANTS = {
    HOST_VM: 'http://206.167.181.119'
};

var URL = {
    login:      CONSTANTS.HOST_VM + '/api/login',
    register:   CONSTANTS.HOST_VM + '/api/users',
    profile:    CONSTANTS.HOST_VM + '/api/users/me',
    token:      CONSTANTS.HOST_VM + '/api/users/me/token',
    signal:     CONSTANTS.HOST_VM + '/api/signal',

    photo:      CONSTANTS.HOST_VM + '/platonix/photo',

    parkings:   CONSTANTS.HOST_VM + '/yeoulparking/parkings'
};

module.exports = {
    Constants: CONSTANTS,
    Url: URL
};
