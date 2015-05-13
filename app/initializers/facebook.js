import ENV from '../config/environment';

export function initialize(/* container, application */) {
    // application.inject('route', 'foo', 'service:foo');
    FB.init({
        appId: ENV.facebookAppId,
        cookie: true,  // enable cookies to allow the server to access 
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.2' // use version 2.2
    });
}

export default {
  name: 'facebook',
  initialize: initialize
};
