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
    baseCity: "",
    baseState: "",
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
    // An anoymous user will have at least 4 variables
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
    	    self.set('baseCity', geoplugin_city());
    	    self.set('baseState', geoplugin_region());

	        if (!session.isAuthenticated) {
	            session.set('longitude', geoplugin_longitude());
	            session.set('latitude', geoplugin_latitude());
	            session.set('baseCity', self.get('baseCity'));
	            session.set('baseState', self.get('baseState'));
	        }
	    }

    }.on('init'),

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
