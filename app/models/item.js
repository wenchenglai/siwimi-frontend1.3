import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    price: DS.attr('number'),
    size: DS.attr('string'),
    width: DS.attr('number'),
    length: DS.attr('number'),
    height: DS.attr('number'),
    fromAge: DS.attr('number'),
    toAge: DS.attr('number'),
    condition: DS.attr('string'), // new, used
    type: DS.attr('string'), // toy, cloth, book, furniture, other
    status: DS.attr('string'), // active, inactive, sold, swapped, gave away
    imageUrl: DS.attr('string'),
    imageData: DS.attr('string'),
    creator: DS.belongsTo('member'),
    buyer: DS.belongsTo('member'),
    createdDate: DS.attr('date'),
    viewCount: DS.attr('number'),
    isForSale: DS.attr('boolean'),
    isForSwap: DS.attr('boolean'),
    isForGiveAway: DS.attr('boolean'),
    isForLoan: DS.attr('boolean'),
    isDestroyed: DS.attr('boolean'),

    // localization fields
    city: DS.attr('string'),
    state: DS.attr('string'),    
    zipCode: DS.attr('string'),
    location: DS.attr('array'),

    ageRange: function () {
        return this.get('fromAge') + ' to ' + this.get('toAge');
    }.property('fromAge', 'toAge'),

    availableImage: function() {
        if (!Em.isEmpty(this.get('imageData'))) {
            return this.get('imageData');
        } else if (!Em.isEmpty(this.get('imageUrl'))) {
            return this.get('imageUrl');
        } else {
            return '/assets/images/emptyproduct.png';
        }
    }.property('imageUrl', 'imageData')
});
