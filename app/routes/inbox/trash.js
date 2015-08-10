import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function () {
        var self = this,
            userId = self.get('session.secure.id');

        return self.store.query('message', { to: userId, toStatus: 'trash' });
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
