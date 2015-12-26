import DS from 'ember-data';
import Ember from 'ember';

var ADMIN = 256;

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

    facebookId: DS.attr('string'),
    highSchool: DS.attr('string'),
    college: DS.attr('string'),
    fhometown: DS.attr('string'),
    flink: DS.attr('string'),
    flocale: DS.attr('string'),
    flocation: DS.attr('string'),
    ftimezone: DS.attr('number'),
    notification: DS.belongsTo('email-notification', { async: true }),
    replies: DS.hasMany('feedback', { embedded: 'always' }),

    // privilege is the software application user authorization level
    // by default, this is 0.  256 is Admin
    // 0: Anonymous User, 1: User, 2: Super User, 4: Content Editor, 8: Reserved, 16: Reserved, 32: Reserved, 64: Reserved, 128: Reserved, 256: Admin
    privilege: DS.attr('number'),

    // used to see if current user is considered a regular user with confirmed account.
    // TODO: might be able to merge this field to the above privilege
    isUser: DS.attr('boolean'),

    // TODO: role should be merged with the privilege field, privilege better reflects the application authroization level, while role could be used for Father, Mother etc
    // authorization [admin, user, anonymous]
    role: DS.attr('string'),

    isAdmin: Ember.computed('role', function() {
        //return this.get('role') === "admin" ? true : false;
        return this.get('privilege') === ADMIN ? true : false;
    }),

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

    // social
    invitedBy: DS.attr('string'),

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

    fullAddress: Ember.computed('city', 'state', 'zipCode', {
      get() {
        return this.get('city') + ', ' + this.get('state') + ' ' + this.get('zipCode');
      }
    })
});
