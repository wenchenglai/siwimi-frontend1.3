import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    price: DS.attr('number'),
    size: DS.attr('string'),
    width: DS.attr('number'),
    length: DS.attr('number'),
    height: DS.attr('number'),
    fromAge: DS.attr('number'),
    toAge: DS.attr('number'),
    condition: DS.attr('string'),
    type: DS.attr('string'),
    status: DS.attr('string'),
    imageUrl: DS.attr('string'),
    imageData: DS.attr('string'),
    seller: DS.belongsTo('member'),
    buyer: DS.belongsTo('member'),
    createdDate: DS.attr('date'),
    viewCount: DS.attr('number'),
    isDestroyed: DS.attr('boolean'),

    ageRange: function () {
        return this.get('fromAge') + ' to ' + this.get('toAge');
    }.property('fromAge', 'toAge')  
});
