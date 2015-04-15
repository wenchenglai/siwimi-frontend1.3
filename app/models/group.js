import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    members: DS.hasMany('member', { embedded: 'always' }),
    createdDate: DS.attr('date')
});
