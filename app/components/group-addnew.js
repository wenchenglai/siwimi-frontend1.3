import Ember from 'ember';

export default Ember.Component.extend({
    selectedFriends:[],
    actions: {
        add:function() {
            var self = this;
            self.sendAction("add",this.get("selectedFriends"));
        },
        invite: function() {
            var self = this;

            self.sendAction("action", self.get('email'));
            self.set("email", "");
        },
        searchFriends:function(typeahead){
        	var self = this;

            self.sendAction("searchFriends", typeahead);
        }
    }
});
