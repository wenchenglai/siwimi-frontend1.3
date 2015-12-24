/* global FB */
import Ember from "ember";
import ENV from '../config/environment';

export function initialize(container, application) {
    Ember.debug('Facebook Initializer runs.');

    application.deferReadiness();

    window.fbAsyncInit = function() {
        initFacebook(window.FB);
        application.advanceReadiness();
    };

    loadFacebookSDK();
}

function loadFacebookSDK() {
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

function initFacebook(FB) {
    FB.init({
        appId: ENV.facebookAppId,
        cookie: true,
        xfbml: false,
        status: true,
        version: ENV.facebookGraphAPIVersion
    });
}

export default {
    name: 'facebook',
    initialize: initialize
};
