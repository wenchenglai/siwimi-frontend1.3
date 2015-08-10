/* global FB */
import ENV from '../config/environment';

export function initialize(container, application) {
    // application.inject('route', 'foo', 'service:foo');
    //FB.init({
    //    appId: ENV.facebookAppId,
    //    cookie: true,  // enable cookies to allow the server to access
    //    // the session
    //    xfbml: true,  // parse social plugins on this page
    //    version: 'v2.2' // use version 2.2
    //});

    application.deferReadiness();

    var fbAsyncInit = function() {
        initFacebook(window.FB);
        application.advanceReadiness();
    };

    loadFacebookSDK();

    window.fbAsyncInit = fbAsyncInit;
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
        xfbml: true,
        version: ENV.facebookGraphAPIVersion
    });
}

export default {
  name: 'facebook',
  initialize: initialize
};
