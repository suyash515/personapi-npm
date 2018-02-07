'use strict';

var request = require("request");

module.exports = {
    personapiUrl: "https://api.personapi.com",
    token: "",
    actions: {
        registerUser: "/appuser/create"
    },

    init: function(token) {
        this.token = token;
    },

    setServiceURL: function(url) {
        if (url.trim() != "") {
            this.personapiUrl = url;
        }
    },

    registerUser: function(params) {
        params.token = this.token;

        return this._sendRequest(this.actions.registerUser, params);
    },

    _sendRequest: function(action, params) {
        var url = this.personapiUrl;

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