var CONSTANTS = {
    HOST_API: 'http://52.170.202.244:80',
    HOST_PLATONIX: 'http://52.170.202.244:5010',
    HOST_YEOUL: 'http://52.170.202.244:5011'
};

var URL = {
    login:      CONSTANTS.HOST_API + '/login',
    register:   CONSTANTS.HOST_API + '/users',
    profile:    CONSTANTS.HOST_API + '/users/me',
    token:      CONSTANTS.HOST_API + '/users/me/token',
    signal:     CONSTANTS.HOST_API + '/signal',

    photo:      CONSTANTS.HOST_PLATONIX + '/photo',

    parkings:   CONSTANTS.HOST_YEOUL + '/parkings'
};

module.exports = {
    Constants: CONSTANTS,
    Url: URL
};
