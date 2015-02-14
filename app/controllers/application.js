import Ember from 'ember';

export default Ember.ObjectController.extend({
    showAlert: false,
    alertTitle: "",
    alertMessage: "",
    alertType: "alert-danger",

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
