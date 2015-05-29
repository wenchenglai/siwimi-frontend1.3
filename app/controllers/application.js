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

    baseLocation: function(key, value, previousValue) {

      // setter
      //if (arguments.length > 1) {
      //    var arr = value.split(',');
      //    this.set('baseCity', arr[0]);
      //    this.set('baseState', arr[1]);
      //}

    	if (!Ember.isEmpty(this.get('baseCity'))) {
    		return "%@, %@".fmt(this.get('baseCity'), this.get('baseState'));
    	} else {
    		return "";
    	}
    }.property('baseCity', 'baseState'),

    // test code saved for later
    friendList: function() {
        return ["c++", "java", "php", "javascript", "ruby", "python", "c"];
    }.property('friends'),

    // this function will be called every time app is loaded
    // we need to preapre for at least 4 variables in session variable.
    // An anonymous user will have at least 4 variables, they are:
    // baseCity, baseState, longitude and latitude
    setBase: function() {
        var self = this,
    		    session = self.get('session');

    	  if (session.isAuthenticated) {
    	      if (!Ember.isEmpty(session.get('baseCity')) && !Ember.isEmpty(session.get('baseCity'))) {
    	          self.set('baseCity', session.get('baseCity'));
    	          self.set('baseState', session.get('baseState'));
	          }
    	  }

        if (Ember.isEmpty(self.get('baseCity')) || Ember.isEmpty(self.get('baseCity'))) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
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

                    // Google Map API for getting location info from latitude and longitude
                    Ember.$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=true').then(onSuccess, onGoogleApiFail);

                }, function(err){
                    if (err.code == 1) {
                        // User refused to grant the right
                        self._setLocationGeoPlugin();
                    }
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
        self.set('baseCity', geoplugin_city());
        self.set('baseState', geoplugin_region());
        self.set('baseLongitude', geoplugin_longitude());
        self.set('baseLatitude', geoplugin_latitude());
    },

    _toggleAlert: function(flag, title, message, type) {
        var self = this;
        self.set('showAlert', flag);
        self.set('alertTitle', title);
        self.set('alertMessage', message);
        self.set('alertType', type);
    },

    //getLocations: function() {
    //  var self = this;
    //
    //  self.store.find('location', {queryText: request.term}).then(function(returnedLocations) {
    //    //self.set('locations', returnedLocations);
    //    self.set('locations', ['aaa', 'bbb', 'ccc', 'ddd']);
    //  });
    //}.property('baseLocation'),

    actions: {
        closeAlert: function() {
            var self = this;
            self._toggleAlert(false);
        }

        //getLocation: function(autocomplete, term) {
        //    var self = this;
        //
        //    self.store.find('location', {queryText: term}).then(function(locations) {
        //        self.set('locations', locations);
        //    });
        //}
    }
});
