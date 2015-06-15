import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        var query = {
            parent: params.id,
            parentType: 'tip'
        };

        return Ember.RSVP.hash({
            tip: this.store.find('tip', params.id),
            feedback: this.store.find('feedback', query)
        });
    },

    //setupController: function(controller, model) {
    //    this._super(controller, model);
    //
    //    var query = {
    //        parent: this.get('id'),
    //        parentType: 'tip'
    //    };
    //    this.store.find('feedback', query).then(function(feedbacks) {
    //        controller.set('feedbacks', feedbacks);
    //    });
    //},

    _addVote: function(voteType) {
        var self = this,
            userId = self.get('session.id'),
            model = self.currentModel;

        self.store.find('member', userId).then(function(member) {
            var voteModel = self.store.createRecord('vote', {
                creator: member,
                voteType: voteType,
                targetObject: model.id,
                objectType: 'tip',
                createdDate: new Date(),
                isDestroyed: false
            });

            voteModel.save().then(function() {
                var voteTypeName = "voteUpCount";

                if (voteType === "down") {
                    voteTypeName = "voteDownCount";
                }
                model.set(voteTypeName, model.get(voteTypeName) + 1);
            });
        });
    },

    actions: {
        goBack: function() {
            var self = this,
                session = self.get('session'),
                previousURL = self.controllerFor('application').get('previousURL');

            if (previousURL) {
                self.transitionTo(previousURL);
            } else {
                self.transitionTo('tip.browse');
            }
        },

        voteUp: function() {
            this._addVote('up');
        },

        voteDown: function() {
            this._addVote('down');
        },

        setFavorite: function() {
            var self = this,
                userId = self.get('session.id'),
                model = self.currentModel;

            if (!model.get('isFavorite')) {
                self.store.find('member', userId).then(function(member) {
                    var newModel = self.store.createRecord('favorite', {
                        creator: member,
                        targetObject: model.id,
                        objectType: 'tip',
                        createdDate: new Date(),
                        isDestroyed: false
                    });

                    newModel.save().then(function() {
                        model.set('isFavorite', true);
                    });
                });
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
                    parentType: 'tip',
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
