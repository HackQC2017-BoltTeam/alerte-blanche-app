let userService = null;

var singleton = {
    user: {
        email: 'william57m@gmail.com'
    },

    getUser: function(user) {
        return this.user;
    },
    setUser: function(user) {
        this.user = user;
    },
    resetUser: function(user) {
        this.user = {};
    },
    isLogged: function() {
        return this.user.hasOwnProperty('email');
    }
};

module.exports = singleton;
