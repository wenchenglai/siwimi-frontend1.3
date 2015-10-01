import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function (params) {
      var self = this;

      var thisModel = {
          message: self.store.createRecord('message'),
          members: self.store.findAll('member'),
          selectedRecipients :[]
      };
      // reply message 
      if (!Ember.isEmpty(params.toId)) {
        thisModel.toId=params.toId;
        thisModel.rootMessage=params.rootMessage;
      }
      return Ember.RSVP.hash(thisModel);
  },

  setupController: function(controller, model) {
      // reply mail
      if (!Ember.isEmpty(model.toId)) {
          // controller.set('selectedToId', model.toId);
      }



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

      searchFriends:function(typeahead) {
          // fetch users
          var self = this;
          
          // get selected items
          var selecedItemId = typeahead.get("selecedItems").getEach("id");
          // var selecedItemId=[];
          // if search word is not empty
          if(typeahead.get("searchWord").length>0){
              // search users for keyword 
              self.store.query("member" , {queryText:typeahead.get("searchWord")}).then(function(userList){
                  // filter selected item
                  var suggestItems=[];
                  userList.filter(function(user){
                      if(selecedItemId.indexOf(user.get("id"))===-1){
                          var item ={
                              id:user.get("id"),
                              name:user.get("fullName"),
                              icon:user.get("availableImage")
                          };
                          suggestItems.push(item);
                          return true; 
                      }
                  });
                  // put users into suggest items
                  typeahead.set("suggestItems" , suggestItems);
              });
          }else{
              // set suggest items empty
              typeahead.set("suggestItems" , []);
          }
      },

      save: function () {
          var self   = this,
              model  = self.currentModel.message,
              selectedRecipientIds  = self.currentModel.selectedRecipients.getEach("id"),
              // toId = self.controller.get('selectedToId'),
              userId = self.get('session.secure.id');
          

          if (selectedRecipientIds.get("length")>0) {
              self.store.findRecord('member', userId).then(function (fromUser) {
                  // find to users
                  selectedRecipientIds.forEach(function(selectedRecipientId){
                      
                      var toUser = self.store.peekRecord("member",selectedRecipientId);
                      // Ember.Logger.log(toUser);
                      var message = self.store.createRecord('message');
                      message.set("subject", model.get("subject"));
                      message.set("body", model.get("body"));
                      message.set('from', fromUser);
                      message.set('to', toUser);
                      message.set('fromStatus', 'sent');
                      message.set('toStatus', 'unread');
                      // 0 and null can't save into DB , design this part later
                      // message.set('rootMessage', self.currentModel.rootMessage); 
                      message.set('isDeletedRecord', false);
                      message.set('createdDate', new Date());
                      
                      var onSuccess = function (message) {
                      };

                      var onFail = function (error) {
                          self.send('error', error);
                      };

                      message.save().then(onSuccess, onFail);
                  });
                  self.transitionTo('inbox.browse');
              });
          } else {
              self.send('error', 'Please select a recipient');
          }
      }
  }
});
