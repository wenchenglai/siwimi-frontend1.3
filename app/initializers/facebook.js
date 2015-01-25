export function initialize(/* container, application */) {
    // application.inject('route', 'foo', 'service:foo');
    FB.init({
        appId: '343069969185068',
        //appId: '290368724455193', 
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