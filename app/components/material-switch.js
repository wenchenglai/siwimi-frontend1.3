import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['material-switch'],
    classNameBindings: ['isPullRight:pull-right'],
    isPullRight: false,
    isChecked: false,
    type: 'default',
    name: 'unnamed',

    actions: {
        action: function (name) {
            var checked = this.toggleProperty('isChecked');
            this.sendAction('action', name, checked);
        }
    }
});
