import store from 'react-native-simple-store';

let userService = null;

var singleton = {
    user: {},

    getUser: function(user) {
        return this.user;
    },
    setUser: function(user) {
        this.user = user;
        store.save('user', user);
    },
    resetUser: function(user) {
        this.user = {};
        store.save('user', {});
    },
    isLogged: function() {
        return this.user.hasOwnProperty('email');
    }
};

module.exports = singleton;
