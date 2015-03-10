import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member', { aysnc: true}),
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
    isDestroyed: DS.attr('boolean'),

    // we use bs-datetimepicker addon which takes moment.js date type, so we must do some conversion when binding
    fromTimeMoment: function(key, value, previousValue) {
        // setter
        if (arguments.length > 1) {
            this.set('fromTime', value.toDate());
        }
        // getter
        return this.get('fromTime');
    }.property('fromTime'),

    // we use bs-datetimepicker addon which takes moment.js date type, so we must do some conversion when binding
    toTimeMoment: function(key, value, previousValue) {
        // setter
        if (arguments.length > 1) {
            this.set('toTime', value.toDate());
        }
        // getter
        return this.get('toTime');
    }.property('toTime'),

    availableImage: function() {
        if (!Em.isEmpty(this.get('imageData'))) {
            return this.get('imageData');
        } else if (!Em.isEmpty(this.get('imageUrl'))) {
            return this.get('imageUrl');
        } else {
            return '/assets/images/empty_event.jpg';
        }
    }.property('imageUrl', 'imageData'),

    cityState: function() {
        return this.get('city') + ', ' + this.get('state');
    }.property('city', 'state')
});
