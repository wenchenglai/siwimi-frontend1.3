import Ember from 'ember';
import StatesDataMixin from '../mixins/states-data';

export default
Ember.Controller.extend(StatesDataMixin, {
    previousTransition: null,
    previousURL: null,
    showAlert: false,
    alertTitle: "",
    alertMessage: "",
    alertType: "alert-danger",
    locations: ['Ann Arbor, MI', "Abb, MI", "ACC, MI", "ADD, CA"],

    // used at application HBS template
    baseLocation: function (key, value, previousValue) {
        if (!Ember.isEmpty(this.get('baseCity'))) {
            return "%@, %@".fmt(this.get('baseCity'), this.get('baseState'));
        } else {
            return "";
        }
    }.property('baseCity', 'baseState'),

    // this function will be called every time app is loaded
    // we need to prepare for at least 4 variables in session variable.
    // An anonymous user will have at least 4 variables, they are:
    // baseCity, baseState, longitude and latitude
    _setBase: function () {
        var self = this,
            session = self.get('session');

        if (session.isAuthenticated) {
            if (!Ember.isEmpty(session.get('baseCity')) && !Ember.isEmpty(session.get('baseCity'))) {
                self.set('baseCity', session.get('baseCity'));
                self.set('baseState', session.get('baseState'));
            }
        }

        if (Ember.isEmpty(self.get('baseCity')) || Ember.isEmpty(self.get('baseCity'))) {
            // HTML 5 Geolocation will return ONLY longitude and latitude
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var latlng = position.coords.latitude + "," + position.coords.longitude;

                    var onSuccess = function (json) {
                        var addarr = json.results[4].formatted_address.split(",");
                        self.set('baseCity', addarr[0]);
                        self.set('baseState', addarr[1]);
                        self.set('baseLongitude', position.coords.latitude);
                        self.set('baseLatitude', position.coords.longitude);
                    };

                    var onGoogleApiFail = function (error) {
                        self.send('error', error);
                    };

                    // Google Geocoding API for getting location info from latitude and longitude
                    Ember.$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=true').then(onSuccess, onGoogleApiFail);
                }, function (err) {
                    if (err.code == 1) {
                        // User refused to grant the right
                        self._setLocationGeoPlugin();
                        return;
                    }
                    // for other failure reason, we still try to get the location
                    self._setLocationGeoPlugin();
                });
            } else {
                // User's browser doesn't support HTML5 Geolocation API
                self._setLocationGeoPlugin();
            }
        }
    }.on('init'),

    _setLocationGeoPlugin() {
        var self = this;
        // we use geoPlugin from http://www.geoplugin.com/
        // the library is included directly in the index.html file
        // TODO: shim the global library by creating ES6 module
        self.set('baseCity', geoplugin_city());
        self.set('baseState', geoplugin_region());
        self.set('baseLongitude', geoplugin_longitude());
        self.set('baseLatitude', geoplugin_latitude());
    },

    _toggleAlert: function (flag, title, message, type) {
        var self = this;
        self.set('showAlert', flag);
        self.set('alertTitle', title);
        self.set('alertMessage', message);
        self.set('alertType', type);
    },

    actions: {
        closeAlert: function () {
            var self = this;
            self._toggleAlert(false);
        }
    }
});
