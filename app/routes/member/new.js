import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        var self = this;
        return self.store.createRecord('member');
    }, 

    actions: {
        cancel: function () {
            this.transitionTo('family.my');
        },
        save: function () {
            var self = this,
                familyId = self.get('session.user.family'),
                model = self.currentModel,
                //birthday = model.get('birthday'),
                trueFamilyId = typeof(familyId) === 'string' ? familyId : self.get('session.user.family.id');

            self.store.find('family', trueFamilyId).then(function(family) {
                model.set('family', family);
                model.set('isUser', false);
                model.set('isDestroyed', false);

                //if (birthday) {
                //    model.set('expiredDate', birthday.toDate());
                //}

                var onSuccess = function (ret) {
                    self.transitionTo('family.my');
                };

                var onFail = function (error) {
                    throw new error('Saving New Member Error');
                };

                model.save().then(onSuccess, onFail);
            });
        }
    }
});
