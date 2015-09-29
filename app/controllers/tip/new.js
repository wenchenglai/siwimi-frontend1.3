import Ember from 'ember';
import StatesDataMixin from '../../mixins/states-data';

export default Ember.Controller.extend(StatesDataMixin, {
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

    isDeal: Ember.computed('model.type', function() {
        return this.get('model.type') === "deal"
    }),

    disabled: function () {
        return Ember.isEmpty(this.get('model.title')) || Ember.isEmpty(this.get('model.description'));
    }.property('model.title', 'model.description'),

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
