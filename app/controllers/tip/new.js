import Ember from 'ember';

export default Ember.ObjectController.extend({
    showAlert: false,
    alertTitle: "",
    alertMessage: "",
    alertType: "",
    isValid: Ember.computed(
    'model.title',
    'model.description',
        function() {
            return !Ember.isEmpty(this.get('model.title')) && !Ember.isEmpty(this.get('model.description'));
        }
    ),

    _getPreviewFromServer: function (url, options) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            options = options || {};

            options.success = function (data) {
                Ember.run(null, resolve, data);
            };

            options.error = function (jqxhr, status, something) {
                Ember.run(null, reject, arguments);
            };

            Ember.$.ajax(url, options);
        });
    },

    actions: {
        save: function() {
            var self = this,
            	model = self.get('model'),
            	userId = self.get('session.id');
            
            if (self.get('isValid')) {
                self.store.find('member', userId).then(function(member) {
                    model.set('createdDate', new Date());
                    model.set('creator', member);
                    var tempDate = model.get('expiredDate').toDate();
                    model.set('expiredDate', tempDate);
                    model.save().then(function(tip) {
                        self.transitionToRoute('tip.show', tip);
                    });
                });
            } else {
                self.set('showAlert', true);
                self.set('alertTitle', 'Error');
                self.set('alertMessage', 'You have to fill both title and description');
                self.set('alertType', 'alert-danger');
            }
            return false;
        },

        cancel: function() {
            this.transitionToRoute('tip.my');
        },

        preview: function () {
            var self = this,
                host = self.store.adapterFor('application').get('host'),
                url = self.get('url');

            self._getPreviewFromServer(host + '/tips/findURL?url=' + url, {
                type: "GET",
                contentType: "application/json"
            }).then(function (data) {
                if (data) {
                    self.set('previewText', data.text);
                }
            });
        }
    }
});
