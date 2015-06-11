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

    actions: {
        save: function() {
            var self = this;
            if (self.get('isValid')) {
                self.get('model').save().then(function(tip) {
                    self.transitionToRoute('tip.show', tip);
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
            this.transitionToRoute('tip.show', this.get('model.id'));
        }
    }
});
