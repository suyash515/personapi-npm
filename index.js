'use strict';

var request = require("request");

module.exports = {
    personapiUrl: "https://personapi.codevigor.com",
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
        getUserId: "/appuser/get-user-id",
        getUserDetailsFromId: "/appuser/get-user-details-from-id",
        verifyActionData: "/appuser/verify-activation-data",
        getUserList : "/appuser/get-user-list",
        activateUserAccount: "/appuser/activate-user-account",
        getInactiveUserDetails: "/appuser/get-inactive-user-details",
        isAdmin: "/appuser/validate-admin",
        emailForResetPassword: "/appuser/email-reset-password",
        verifyResetPasswordData: "/appuser/verify-reset-password-data",
        resetPassword: "/appuser/reset-password"
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

    isAdmin: function(params)
    {
        return this._sendRequest(this.actions.isAdmin, params);
    },

    getInactiveUserDetails: function(params) {
        return this._sendRequest(this.actions.getInactiveUserDetails, params);
    },

    registerUser: function(params) {
        return this._sendRequest(this.actions.registerUser, params);
    },

    verifyActivationData: function(params) {
        return this._sendRequest(this.actions.verifyActionData, params);
    },

    activateUserAccount: function(params) {
        return this._sendRequest(this.actions.activateUserAccount, params);
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

    getUserDetailsFromId: function(params) {
        return this._sendRequest(this.actions.getUserDetailsFromId, params);
    },

    getUserList: function(params) {
      return this._sendRequest(this.actions.getUserList, params);
    },

    emailForResetPassword: function(params) {
        return this._sendRequest(this.actions.emailForResetPassword, params);
    },

    verifyResetPasswordData: function(params) {
        return this._sendRequest(this.actions.verifyResetPasswordData, params);
    },

    resetPassword: function(params) {
        return this._sendRequest(this.actions.resetPassword, params);
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