import Ember from 'ember';
import ActivityDataMixin from '../../mixins/activity-data';

export default Ember.Controller.extend(ActivityDataMixin, {
    color: null,
    showEdit: function() {
      if (!Ember.isEmpty(this.get('creator'))) {
        return this.get('creator.id') === this.get('session.secure.id');
      } else {
        return false;
      }
    }.property(),

    currentUrl: window.location.href,

    showNotifyFriends: function() {
        return !Ember.isEmpty(this.model.emactions.get('length'));
    }.property('model.emactions.@each.action'),

    isSendEmail: true,

    checkAllGroup: function() {
        var self = this;

        if (self.model.allGroupChecked) {
            self.model.groups.forEach(function(group, index, enumerable){
                group.set('isChecked', false);
            });
        }
    }.observes('model.allGroupChecked'),

    checkGroup: function() {
        var self = this,
            flag = self.model.groups.isAny('isChecked', true) ? false : true;

        self.set('model.allGroupChecked', flag);
    }.observes('model.groups.@each.isChecked'),

    actions: {
        setNotifitication: function(selectedValue) {
            var self = this;

            if (selectedValue === '1') {
                self.set('isSendEmail', true);
            } else {
                self.set('isSendEmail', false);
            }
        }
    }
});
