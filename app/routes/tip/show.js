import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        var query = {
            parent: params.id,
            parentType: 'tip'
        };

        return Ember.RSVP.hash({
            tip: this.store.findRecord('tip', params.id),
            feedbacks: this.store.query('feedback', query)
        });
    },

    _addVote: function(voteType) {
        var self = this,
            userId = self.get('session.secure.id'),
            model = self.currentModel;

        self.store.query('vote', { creator: userId, targetObject: model.tip.id, objectType: "tip"}).then(function(votes) {
            if (votes.get('length') === 0) {
                self.store.findRecord('member', userId).then(function(member) {
                    var voteModel = self.store.createRecord('vote', {
                        creator: member,
                        voteType: voteType,
                        targetObject: model.tip.id,
                        objectType: 'tip',
                        createdDate: new Date(),
                        isDeletedRecord: false
                    });

                    voteModel.save().then(function() {
                        var voteTypeName = "voteUpCount";

                        if (voteType === "down") {
                            voteTypeName = "voteDownCount";
                        }
                        model.tip.incrementProperty(voteTypeName);
                    });
                });
            } else {
                var vote = votes.get('firstObject');
                if (vote.get("voteType") !== voteType) {
                    vote.set("voteType", voteType);
                    vote.save().then(function(vote) {
                        if (voteType === "down") {
                            model.tip.incrementProperty("voteDownCount");
                        } else {
                            model.tip.incrementProperty("voteUpCount");
                        }
                    });
                }
            }
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
                userId = self.get('session.secure.id'),
                model = self.currentModel;

            self.store.query('favorite', { creator: userId, targetObject: model.tip.id, objectType: "tip"}).then(function(favorites) {
                if (favorites.get('length') === 0) {
                    self.store.findRecord('member', userId).then(function(member) {
                        var newModel = self.store.createRecord('favorite', {
                            creator: member,
                            targetObject: model.tip.id,
                            objectType: 'tip',
                            createdDate: new Date(),
                            isDeletedRecord: false
                        });

                        newModel.save().then(function() {
                            model.tip.set('isFavorite', true);
                        });
                    });
                } else {
                    // we delete this favorite object, since user doesn't want it anymore
                    favorites.forEach(function(fav, index, enumerable) {
                       fav.delete();
                    });
                }
            });
        },

        addNewFeedback: function (id) {
            var self = this,
                userId = self.get('session.secure.id'),
                model = self.currentModel,
                newObj;

            if (Ember.isEmpty(userId)) {
                return self.render('loginModal', {
                    into: 'application',
                    outlet: 'modal'
                });
            }

            self.store.findRecord('member', userId).then(function(member) {
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
                    self.refresh();
                    //model.feedback.pushObject(feedback);
                    self.controller.set('newFeedbackText', '');
                }, function (error) {
                    self.send('error', error);
                });
            });
        }
    }
});
