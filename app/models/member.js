import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    nickName: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    birthday: DS.attr('date'),
    languages: DS.attr('array'),
    type: DS.attr('string'),
    gender: DS.attr('string'),
    avatarUrl: DS.attr('string'),
    imageData: DS.attr('string'),
    family: DS.belongsTo('family', { async: true }),
    isUser: DS.attr('boolean'),
    facebookId: DS.attr('string'),
    highSchool: DS.attr('string'),
    college: DS.attr('string'),
    fhometown: DS.attr('string'),
    flink: DS.attr('string'),
    flocale: DS.attr('string'),
    flocation: DS.attr('string'),
    ftimezone: DS.attr('number'),
    replies: DS.hasMany('feedback', { embedded: 'always' }),

    // authorization [admin, user, anonymous]
    role: DS.attr('string'),

    // sign up process
    isConfirmedMember: DS.attr('boolean'),
    isInSignUpProcess: DS.attr('boolean'),

    // localization fields
    city: DS.attr('string'),
    state: DS.attr('string'),
    zipCode: DS.attr('string'),
    location: DS.attr('array'),

    // feature fields
    toys: DS.attr('array'),
    needs: DS.attr('array'),

    // data management fields
    isDeletedRecord: DS.attr('boolean'),

    // we use bs-datetimepicker addon which takes moment.js date type, so we must do some conversion when binding
    birthdayMoment: Ember.computed("birthday", {
        get: function() {
            return this.get('birthday');
        },

        set: function(key, value) {
            if (value) {
                this.set('birthday', value.toDate());
            } else {
                this.set('birthday', null);
            }
            return value;
        }
    }),

    birthYear: function() {
        return new Date(this.get('birthday')).getFullYear();
    }.property('birthday'),

    birthMonth: function () {
        return new Date(this.get('birthday')).getMonth() + 1;
    }.property('birthday'),

    birthDayNumber: function () {
        return new Date(this.get('birthday')).getDate();
    }.property('birthday'),

    displayName: function() {
        if (!Ember.isEmpty(this.get('nickName'))) {
            return this.get('nickName');
        } else if (!Ember.isEmpty(this.get('firstName'))) {
            return this.get('firstName');
        } else {
            return '';
        }
    }.property('firstName', 'lastName', 'nickName'),

    fullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),

    availableImage: function() {
        if (!Ember.isEmpty(this.get('imageData'))) {
            return this.get('imageData');
        } else if (!Ember.isEmpty(this.get('avatarUrl'))) {
            return this.get('avatarUrl');
        } else {
            return '/assets/images/profile.png';
        }
    }.property('avatarUrl', 'imageData'),

    isAdmin: Ember.computed('role', function() {
        return this.get('role') === "admin" ? true : false;
    })
});
