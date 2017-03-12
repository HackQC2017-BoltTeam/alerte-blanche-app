let userService = null;

var singleton = {
    user: {
        // firstname: 'William',
        // lastname: 'Mura',
        // email: 'william57m@gmail.com',
        // countReference: 5,
        // plate: 'ABC-123'
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
