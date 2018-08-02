PersonAPI
=========

A simple library that allows you to access the functions provided by the PersonAPI platform.

## Installation

  `npm install personapi`

## Usage

    var personapi = require('personapi');
    personapi.init({
        token: "your_user_token",
        app_token: "your_app_token"
    });

    personapi.registerUser({
        "email": "suyash@codevigor.com",
        "password": "user_password"
    })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.log(err);
    });

## API Functions
    - Login function - creates a new session for a user

    personapi.login({
        email: "suyash@codevigor.com",
        password: "user_password"
    });

    - Check session - checks if a user's session is still active
    personapi.checkSession({
        email: "suyash@codevigor.com",
        login_token": "token_received_after_login"
    });

    - Logout - destroys the current active session for a user
    personapi.logout({
        email: "suyash@codevigor.com",
        login_token": "token_received_after_login"
    });

    - Retrieve user details - queries the service for details of a user
    personapi.getUserDetails({
        email: "suyash@codevigor.com",
        login_token": "token_received_after_login"
    });

    - Update user details - overwrites user details
    personapi.saveUserDetails({
        email: "suyash@codevigor.com",
        login_token": "token_received_after_login",
        first_name: "new first name",
        surname: "new last name",
        additional_details: {
            address: "new address",
            mobile: "new mobile"
        }
    });

    - Update password - updates password of user
    personapi.changePassword({
        email: "suyash@codevigor.com",
        login_token": "token_received_after_login",
        old_password: "old user password",
        new_password: "new password"
    });

    - Get user list - returns list of users
    personapi.getUserList({
        email: "suyash@codevigor.com",
        login_token": "token_received_after_login"
    });
