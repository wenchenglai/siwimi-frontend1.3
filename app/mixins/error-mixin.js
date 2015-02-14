import Ember from 'ember';

export default Ember.Mixin.create({
    showAlert: false,
    alertTitle: "",
    alertMessage: "",
    alertType: "",

    _toggleAlert: function(flag, title, message, type) {
        var self = this;
        self.set('showAlert', flag);
        self.set('alertTitle', title);
        self.set('alertMessage', message);
        self.set('alertType', type);
    },
});
