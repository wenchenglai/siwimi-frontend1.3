import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);

        var query = {
            parent: model.get('id'),
            parentType: 'tip'
        };
        this.store.find('feedback', query).then(function(feedbacks) {
            controller.set('feedbacks', feedbacks);
        });
    },

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

        addNewFeedback: function () {
            var self = this,
                userId = self.get('session.id'),
                model = self.currentModel,
                newObj;

            self.store.find('member', userId).then(function(member) {
                newObj = self.store.createRecord('feedback', {
                    creator: member,
                    parent: model.get('id'),
                    parentType: 'tip',
                    createdDate: new Date(),
                    description: self.controller.get('feedbackText'),
                    viewCount: 0,
                    likeCount: 0,
                    city: member.get('city'),
                    state: member.get('state'),
                    isDestroyed: false
                });

                newObj.save().then(function (feedback) {
                    var feedbacks = self.controller.get('feedbacks');
                    feedbacks.addRecord(feedback);
                    self.set('feedbacks', feedbacks);

                }, function (error) {
                    self.send('error', error);
                });
            });
        },

        addNewComment: function (fbId, commentText) {

            var self = this,
                user = self.get('session.user');

            self.store.find('feedback', fbId).then(function(feedback) {
                var newObj = self.store.createRecord('feedback', {
                    creator: user,
                    parent: fbId,
                    createdDate: new Date(),
                    description: commentText,
                    viewCount: 0,
                    likeCount: 0,
                    isDestroyed: false
                });

                newObj.save().then(function (data) {
                    var comments = feedback.get('comments');
                    comments.addObject(data);
                    self.send('refresh');
                }, function (error) {
                    self.send('error', error);
                });
            });
        },
    }
});
