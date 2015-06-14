import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        var query = {
            parent: params.id,
            parentType: 'question'
        };

        return Ember.RSVP.hash({
            question: this.store.find('question', params.id),
            feedback: this.store.find('feedback', query)
        });
    },

    actions: {
        goBack: function() {
            var self = this,
                session = self.get('session');

            if (session.isAuthenticated) {
                self.transitionTo('tip.my');
            } else {
                self.transitionTo('tip.browse');
            }
        },

        addNewFeedback: function (id) {
            var self = this,
                userId = self.get('session.id'),
                model = self.currentModel,
                newObj;

            self.store.find('member', userId).then(function(member) {
                newObj = self.store.createRecord('feedback', {
                    creator: member,
                    parent: id,
                    parentType: 'question',
                    createdDate: new Date(),
                    description: self.controller.get('newFeedbackText'),
                    viewCount: 0,
                    likeCount: 0,
                    city: member.get('city'),
                    state: member.get('state'),
                    isDeletedRecord: false
                });

                newObj.save().then(function (feedback) {
                    model.feedback.pushObject(feedback);
                    self.controller.set('newFeedbackText', '');
                }, function (error) {
                    self.send('error', error);
                });
            });
        }
    }
});
