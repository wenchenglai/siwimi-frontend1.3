import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        var query = {
            parent: params.id,
            parentType: 'question'
        };

        return Ember.RSVP.hash({
            question: this.store.findRecord('question', params.id),
            feedbacks: this.store.query('feedback', query)
        });
    },

    actions: {
        goBack: function() {
            history.back();
        },

        addNewFeedback: function (id) {
            var self = this,
                userId = self.get('session.secure.id'),
                model = self.currentModel,
                newObj;

            self.store.findRecord('member', userId).then(function(member) {
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
                    //model.feedback.pushObject(feedback);
                    self.refresh();
                    self.controller.set('newFeedbackText', '');
                }, function (error) {
                    self.send('error', error);
                });
            });
        },

        deleteByAdmin: function(id) {
            var self = this;

            self.store.findRecord('question', id).then(function (record) {
                record.destroyRecord();
                self.transitionTo('questions.browse');
            });
        }
    }
});
