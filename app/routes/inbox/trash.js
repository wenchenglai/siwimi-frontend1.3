import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        var self = this,
            session = self.get('session'),
            user = session.get('user');

        return self.store.find('message', { to: user.id, isDestroyed: true });
    },

    actions: {
        purgeEmail: function() {

        },

        markRead: function() {
            var self = this,
                model = self.get('model'),
                length = model.get('length'),
                entity;

            for (var i = 0; i < length; i++) {
                entity = model.content[i];
                if (entity.get('toStatus') === "unread") {
                    entity.set('toStatus', 'read');
                    entity.save();
                }
            }
            self.send('refresh');
        },

        markReadSelected: function() {
            var self = this,
                model = self.get('model'),
                length = model.get('length'),
                entity;

            for (var i = 0; i < length; i++) {
                entity = model.content[i];
                if (entity.get('isChecked')) {
                    entity.set('toStatus', 'read');
                    entity.save();
                }
            }
            self.send('refresh');
        }
    }
});
