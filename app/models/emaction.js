import DS from 'ember-data';

export default DS.Model.extend({
    event: DS.belongsTo('activity'),
    member: DS.belongsTo('member'),
    action: DS.attr('string'), // Go 1, Undecided 2, NotGo 3
    createdDate: DS.attr('date'),
    lastUpdateDate: DS.attr('date') // it's useful to keep this info
});
