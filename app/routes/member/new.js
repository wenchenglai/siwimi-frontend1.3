import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this,
            session = self.get('session');

        return self.store.createRecord('member', { city: session.get('baseCity'), state: session.get('baseState'), zipCode: session.get('zipCode')});
    }, 

    actions: {
        cancel: function () {
            this.transitionTo('family.my');
        },
        next: function () {
            this.render('member.flavors');
        },
        skip: function () {
            this.currentModel.set('toys', []);
            this.currentModel.set('needs', []);
            this.send('save');
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

                var onSuccess = function () {
                    self.transitionTo('family.my');
                };

                var onFail = function (error) {

                };

                model.save().then(onSuccess, onFail);
            });
        }
    }
});
