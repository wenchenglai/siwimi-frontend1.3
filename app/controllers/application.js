import Ember from 'ember';

export default Ember.ObjectController.extend({
    previousTransition: null,
    previousURL: null,
    showAlert: false,
    alertTitle: "",
    alertMessage: "",
    alertType: "alert-danger",
    baseCity: "",
    baseState: "",
    
    baseLocation: function() {
    	if (!Ember.isEmpty(this.get('baseCity'))) {
    		return "%@, %@".fmt(this.get('baseCity'), this.get('baseState'));
    	} else {
    		return "";
    	}
    }.property('baseCity', 'baseState'),
    
    setBase: function() {
    	debugger;
    	var self = this,
    		userId = self.get('session.id');
    	
//    	if (userId) {
//    		self.set('baseCity', geoplugin_city(););
//    		self.set('baseState', geoplugin_region(););   		
//    	} else {
//    		self.set('baseCity', '');
//    		self.set('baseState', '');
//    	}
    	
    }.on('init'),
    
    willTransition: function() {
    	debugger;
    },

    _toggleAlert: function(flag, title, message, type) {
        var self = this;
        self.set('showAlert', flag);
        self.set('alertTitle', title);
        self.set('alertMessage', message);
        self.set('alertType', type);
    },

    actions: {
        closeAlert: function() {
            var self = this;
            self._toggleAlert(false);
        }
    }
});
