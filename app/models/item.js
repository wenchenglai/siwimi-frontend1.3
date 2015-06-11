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
    condition: DS.attr('string'), // New, Lightly Used, Heavily Used
    type: DS.attr('string'), // toy, cloth, book, equipment, furniture, misc
    transitionType: DS.attr('string'), // Sale, Swap, Loan, GiveAway
    status: DS.attr('string'), // active, inactive, completed
    imageUrl: DS.attr('string'),
    imageData: DS.attr('string'),
    creator: DS.belongsTo('member', {async: true}),
    buyer: DS.belongsTo('member'),
    createdDate: DS.attr('date'),
    viewCount: DS.attr('number'),
    isComplete: DS.attr('boolean'),
    queryCount: DS.attr('number'),

    // localization fields
    city: DS.attr('string'),
    state: DS.attr('string'),
    zipCode: DS.attr('string'),
    location: DS.attr('array'),

    // data management fields
    isDeletedRecord: DS.attr('boolean'),

    ageRange: function () {
        return this.get('fromAge') + ' to ' + this.get('toAge');
    }.property('fromAge', 'toAge'),

    availableImage: function() {
        if (!Em.isEmpty(this.get('imageData'))) {
            return this.get('imageData');
        } else if (!Em.isEmpty(this.get('imageUrl'))) {
            return this.get('imageUrl');
        } else {
            return '/assets/images/placeholder-listings.jpg';
        }
    }.property('imageUrl', 'imageData')
});
