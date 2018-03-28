'use strict';

var request = require("request");

module.exports = {
    personapiUrl: "https://api.personapi.com",
    userToken: "",
    appToken: "",
    actions: {
        registerUser: "/appuser/create",
        loginUser: "/appuser/login",
        checkUserLogin: "/appuser/check-session",
        logout: "/appuser/logout",
        getDetails: "/appuser/get-details",
        saveDetails: "/appuser/save-details",
        changePassword: "/appuser/change-password",
        getUserId: "/appuser/get-user-id"
    },

    init: function(settings) {
        this.userToken = settings.token;
        this.appToken = settings.app_token;
        this.setServiceURL(settings.test_url);
    },

    setServiceURL: function(url) {
        if (url.trim() != "") {
            this.personapiUrl = url;
        }
    },

    registerUser: function(params) {
        return this._sendRequest(this.actions.registerUser, params);
    },

    login: function(params) {
        return this._sendRequest(this.actions.loginUser, params);
    },

    checkSession: function(params) {
        return this._sendRequest(this.actions.checkUserLogin, params);
    },

    logout: function(params) {
        return this._sendRequest(this.actions.logout, params);
    },

    getUserDetails: function(params) {
        return this._sendRequest(this.actions.getDetails, params);
    },

    saveUserDetails: function(params) {
        return this._sendRequest(this.actions.saveDetails, params);
    },

    changePassword: function(params) {
        return this._sendRequest(this.actions.changePassword, params);
    },

    getUserId: function(params) {
        return this._sendRequest(this.actions.getUserId, params);
    },

    _sendRequest: function(action, params) {
        var url = this.personapiUrl;

        if(!params) {
            params = {};
        }

        params.token = this.userToken;
        params.app_token = this.appToken;

        return new Promise(function(fulfill, reject) {
            var options = {
                uri: url + action,
                method: "POST",
                json: params
            };

            request(options, function(error, response, body) {
                if(error) {
                    reject(error);
                } else {
                    if(body.success) {
                        fulfill(body);
                    } else {
                        reject(body.error);
                    }
                }
            });
        });
    }
};