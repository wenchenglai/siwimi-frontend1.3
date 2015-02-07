import Ember from 'ember';

export default Ember.Route.extend({
    afterModel: function(a, b) {
        var c = 4;
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
                model.set('voteUp', model.get('voteUp') + 1);
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
        }
    }
});
