import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.findRecord('group', params.id);
    },

    setupController: function(controller, model) {
        var self = this;

        model.get("members").forEach(function(member, index, enumerable){
            if (member.get('id') === model.get('creator.id')) {
                member.set("isOwner", true);
            } else {
                member.set("isOwner", false);
            }
        });
        controller.set('model', model);
        self.showList();
    },

    showList: function() {
        var self = this;

        self.controller.set('showList', true);
        self.controller.set('showAddNew', false);
    },

    showAddNew: function() {
        var self = this;

        self.controller.set('showList', false);
        self.controller.set('showAddNew', true);
    },

    actions: {
        goBack: function() {
            var self = this,
                session = self.get('session'),
                previousURL = self.controllerFor('application').get('previousURL');

            if (previousURL) {
                self.transitionTo(previousURL);
            } else {
                self.transitionTo('group.my');
            }
        },

        showList: function() {
            var self = this;

            self.showList();
        },

        deleteMember: function(id) {
            var self = this,
                creator = self.currentModel.get('creator'),
                members = self.currentModel.get('members'),
                toDelete = members.findBy('id', id);

            if (toDelete === creator) {
                self.send('showAlertBar', {
                    title: 'Error',
                    message: "You cannot delete the creator of the group.",
                    type: 'alert-danger'
                });
                return;
            }

            members.removeObject(toDelete);

            var onSuccess = function (obj) {
                self.send('showAlertBar', {
                    title: 'Success',
                    message: "Removed member from group.",
                    type: 'alert-success'
                });
                self.transitionTo('group.show', obj);
            };

            var onFail = function (error) {
                self.send('error', error);
            };

            self.currentModel.save().then(onSuccess, onFail);
        },

        showAddNew: function() {
            var self = this;

            self.showAddNew();
        },

        inviteFriend: function(email) {
            var self = this,
                userId = self.get('session.secure.id'),
                groupId = self.currentModel.get('id'),
                host = ENV.apiHost,
                api = "%@/email/invite?email=%@&userid=%@&groupid=%@".fmt(host, email, userId, groupId);

            $.getJSON(api);

            self.send('showAlertBar', {
                title: 'Success',
                message: "We've sent your friend an invitation email.",
                type: 'alert-success'
            });
        },

        resendInviteEmail: function(email) {
            var self = this,
                userId = self.get('session.secure.id'),
                groupId = self.currentModel.get('id'),
                host = ENV.apiHost,
                api = "%@/email/invite?email=%@&userid=%@&groupid=%@".fmt(host, email, userId, groupId);

            $.getJSON(api);

            self.send('showAlertBar', {
                title: 'Success',
                message: "We've sent your friend an invitation email.",
                type: 'alert-success'
            });
        },

        addFriends:function(selectedFriends){
            var self = this;
            var group = self.currentModel;
            selectedFriends.forEach(function(selectedFriend){
                var user = self.store.peekRecord("member",selectedFriend.id);
                group.get("members").pushObject(user); 
            });
            
            group.save().then(function(){
                selectedFriends.clear();
                self.showList();
            });
        },

        searchFriends: function(typeahead) {
            // fetch users
            var users=[];
            // get selected items
            var selecedItemId = typeahead.get("selecedItems").getEach("id");
            // also need to filter current members in group
            selecedItemId=selecedItemId.concat(this.currentModel.get("members").getEach("id"));
            
            // if search word is not empty
            if(typeahead.get("searchWord").length>0){
                // search users for keyword 
                this.store.query("member" , {queryText:typeahead.get("searchWord")}).then(function(userList){
                    // filter selected item
                    var suggestItems=[];
                    users = userList.filter(function(user){
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
                    // typeahead.set("suggestItems" , users);
                });
            }else{
                // set suggest items empty
                typeahead.set("suggestItems" , []);
            }
        },

        saveGroupName: function() {
            var self = this;

            self.currentModel.save();
            self.controller.set('showEditGroupName', false);
        },

        editGroupName: function() {
            var self = this;

            self.controller.set('showEditGroupName', true);
        }
    }
});
