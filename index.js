'use strict';

var request = require("request");

module.exports = {
    personapiUrl: "https://api.personapi.com",
    userToken: "",
    appToken: "",
    actions: {
        registerUser: "/appuser/create",
        loginUser: "/appuser/login"
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
                    fulfill(body);
                }
            });
        });
    }
};