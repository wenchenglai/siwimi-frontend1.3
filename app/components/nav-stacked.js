import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        clickItem: function (item) {
            this.get('items').forEach(function (item) {
                item.set('isActived', false);
            });
            item.set('isActived', true);
            this.sendAction('action', item.template);
        }
    }
});
