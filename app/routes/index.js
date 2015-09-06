import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        showAlert: {
            refreshModel: false
        },
        title: {
            refreshModel: false
        },
        message: {
            refreshModel: false
        },
        type: {
            refreshModel: false
        }
    },

    beforeModel: function() {
        if (this.get('session').isAuthenticated) {
            this.transitionTo('feeds.browse');
        }
    },

    model: function(param) {
        var self = this;

        if (param.showAlert) {
            self.send('showAlertBar', {
                title: param.title,
                message: param.message,
                type : param.type});
        }
    }
});
