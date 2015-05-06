import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    fromDate: DS.attr('date'),
    toDate: DS.attr('date'),
    fromTime: DS.attr('string'),
    toTime: DS.attr('string'),
    address: DS.attr('string'),
    status: DS.attr('string'),
    url: DS.attr('string'),
    imageData: DS.attr('string'),
    imageUrl: DS.attr('string'),
    type: DS.attr('string'),
    like: DS.attr('number'),
    viewCount: DS.attr('number'),
    fromAge: DS.attr('number'),
    toAge: DS.attr('number'),
    price: DS.attr('number'),
    createdDate: DS.attr('date'),
    isFavorite: DS.attr('boolean'),

    city: DS.attr('string'),
    state: DS.attr('string'),
    zipCode: DS.attr('string'),
    location: DS.attr('array'),

    // we use bs-datetimepicker addon which takes moment.js date type, so we must do some conversion when binding
    fromDateMoment: function(key, value, previousValue) {
        // setter
        if (arguments.length > 1) {
            this.set('fromDate', value.toDate());
        }
        // getter
        return this.get('fromDate');
    }.property('fromDate'),

    // we use bs-datetimepicker addon which takes moment.js date type, so we must do some conversion when binding
    toDateMoment: function(key, value, previousValue) {
        // setter
        if (arguments.length > 1) {
            this.set('toDate', value.toDate());
        }
        // getter
        return this.get('toDate');
    }.property('toDate'),

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
    }.property('city', 'state'),

    trueCost: function() {
        var result = "Free";

        if (this.get('price')) {
            if (this.get('price') > 0) {
                result = this.get('price');   
            }
        }

        return result;
    }.property('price'),

    ageRange: function() {
        if (this.get('fromAge') && this.get('toAge')) {
            return "%@ - %@".fmt(this.get('fromAge'), this.get('toAge'));

        } else if (this.get('fromAge') && !this.get('toAge')) {
            return "%@ or above".fmt(this.get('fromAge'));

        } else if (this.get('fromAge') && !this.get('toAge')) {
            return "%@ or under".fmt(this.get('toAge'));

        } else {
            return "";
        }

    }.property('fromAge', 'toAge')
});
