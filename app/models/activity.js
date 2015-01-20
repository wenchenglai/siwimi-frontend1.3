import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    fromTime: DS.attr('date'),
    toTime: DS.attr('date'),
    address: DS.attr('string'),
    city: DS.attr('string'),
    state: DS.attr('string'),
    zipCode: DS.attr('string'),
    url: DS.attr('string'),
    imageData: DS.attr('string'),
    imageUrl: DS.attr('string'),
    type: DS.attr('string'),
    like: DS.attr('number'),
    viewCount: DS.attr('number'),
    location: DS.attr('array'),
    isDestroyed: DS.attr('boolean')  
});
