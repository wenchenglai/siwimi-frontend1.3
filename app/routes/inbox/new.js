import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function (params) {
      var self = this;

      return Ember.RSVP.hash({
          message: self.store.createRecord('message'),
          members: self.store.find('member'),
          to: self.store.find('member', params.toId)
      });
  },

  setupController: function(controller, model) {
      model.message.set('to', model.to);
      controller.set('model', model);
  },

  actions: {
      cancel: function () {
          var self        = this,
              session     = self.get('session'),
              previousURL = self.controllerFor('application').get('previousURL');

          if (previousURL) {
              self.transitionTo(previousURL);
          } else {
              self.transitionTo('inbox.browse');
          }
      },

      save: function () {
          var self   = this,
              model  = self.currentModel.message,
              userId = self.get('session.id');

          self.store.find('member', userId).then(function (fromUser) {
                model.set('from', fromUser);
                model.set('fromStatus', 'sent');
                model.set('toStatus', 'unread');
                model.set('isDeletedRecord', false);
                model.set('createdDate', new Date());

                var onSuccess = function (item) {
                    self.transitionTo('inbox.browse');
                };

                var onFail = function (error) {
                    self.send('error', error);
                };

                model.save().then(onSuccess, onFail);
          });
      }
  }
});
