import DS from 'ember-data';

export default DS.Model.extend({
    member: DS.belongsTo('member'),
    event: DS.belongsTo('activity'),
    type: DS.attr('string'), // Go, Undecided, NotGo
    createdDate: DS.attr('date'),
    lastUpdateDate: DS.attr('date') // it's useful to keep this info
});
