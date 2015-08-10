import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member', {async: true}),
    cId: DS.attr('string'),
    type: DS.attr('string'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    createdDate: DS.attr('date'),

    city: DS.attr('string'),
    state: DS.attr('string'),
    zipCode: DS.attr('string'),
    location: DS.attr('array'),

    isDeletedRecord: DS.attr('boolean')
});
