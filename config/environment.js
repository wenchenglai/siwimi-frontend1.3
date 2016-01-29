/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'siwimi-parents',
        environment: environment,
        baseURL: '/',
        locationType: 'hash',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
        // Here you can pass flags/options to your application instance
        // when it is created
        },

        contentSecurityPolicy: {
            'default-src': "'self'",
            'script-src': "'self' 'unsafe-inline' 'unsafe-eval' use.typekit.net connect.facebook.net apis.google.com maps.googleapis.com maps.gstatic.com www.geoplugin.net www.google-analytics.com graph.facebook.com",
            'style-src': "'self' 'unsafe-inline' use.typekit.net fonts.googleapis.com",
            'img-src': "'self' data: fbcdn-profile-a.akamaihd.net apis.google.com www.google-analytics.com www.facebook.com scontent.xx.fbcdn.net http://localhost:8080",
            'frame-src': "'self' accounts.google.com http://staticxx.facebook.com https://staticxx.facebook.com static.ak.facebook.com https://s-static.ak.facebook.com https://www.facebook.com",
            'connect-src': "'self' 199.223.236.115:8080 localhost:8080 maps.googleapis.com",
            'font-src': "'self' fonts.gstatic.com"
        }
    };

    ENV['simple-auth'] = {
        authorizer: 'authorizer:custom',
        store: 'simple-auth-session-store:local-storage',
        crossOriginWhitelist: ['http://localhost:8080', 'http://104.197.18.44']
    };

    if (environment === 'development') {
        //ENV.APP.LOG_RESOLVER = true;
        //ENV.APP.LOG_ACTIVE_GENERATION = true;
        //ENV.APP.LOG_TRANSITIONS = true;
        //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        //ENV.APP.LOG_VIEW_LOOKUPS = true;
        ENV.apiHost = 'http://localhost:8080';
        ENV.facebookAppId = '343069969185068';
        ENV.facebookGraphAPIVersion = 'v2.5';
        ENV.eventImagePath = 'http://localhost:8080/';
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';

        ENV.facebookAppId = '343069969185068';
    }

    if (environment === 'production') {
        ENV.apiHost = 'http://54.175.121.3/siwimi-webapi-0.0.1';
        ENV.facebookAppId = '290368724455193';
        ENV.facebookGraphAPIVersion = 'v2.5';
        ENV.eventImagePath = 'http://54.175.121.3';
    }

    return ENV;
};
