import DS from 'ember-data';
import Ember from 'ember';
import ENV from '../config/environment';

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
    imagePath: DS.attr('string'),
    type: DS.attr('string'),
    like: DS.attr('number'),
    viewCount: DS.attr('number'),
    fromAge: DS.attr('number'),
    toAge: DS.attr('number'),
    price: DS.attr('number'),
    createdDate: DS.attr('date'),
    isFavorite: DS.attr('boolean'),
    queryCount: DS.attr('number'),
    errorCode: DS.attr('number'),
    parser: DS.attr('string'),
    customData: DS.attr('string'),
    stage: DS.attr('string'), // Submitted, Approved, Rejected

    city: DS.attr('string'),
    state: DS.attr('string'),
    zipCode: DS.attr('string'),
    location: DS.attr('array'),

    // data management fields
    isDeletedRecord: DS.attr('boolean'),

    // we use bs-datetimepicker addon which takes moment.js date type, so we must do some conversion when binding
    fromDateMoment: Ember.computed("fromDate", {
        get: function() {
            return this.get('fromDate');
        },

        set: function(key, value) {
            if (value) {
                this.set('fromDate', value.toDate());
            } else {
                this.set('fromDate', null);
            }
            return value;
        }
    }),

    // we use bs-datetimepicker addon which takes moment.js date type, so we must do some conversion when binding
    toDateMoment: Ember.computed("toDate", {
        get: function() {
            return this.get('toDate');
        },

        set: function(key, value) {
            if (value) {
                this.set('toDate', value.toDate());
            } else {
                this.set('toDate', null);
            }
            return value;
        }
    }),

    availableImage: function() {
        var url = this.get('imageUrl'),
            path = this.get('imagePath'),
            data = this.get('imageData');

        if (!Ember.isEmpty(path)) {
            return ENV.eventImagePath + path;

        } else if (!Em.isEmpty(data)) {
            return this.get('imageData');

        } else if (!Ember.isEmpty(url)) {
            return url;

        } else {
            return '/assets/images/placeholder-events.jpg';
        }
    }.property('imageUrl', 'imageData', 'imagePath'),

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
