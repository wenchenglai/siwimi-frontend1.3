import DS from 'ember-data';

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
    family: DS.belongsTo('family', { async: true}),
    isUser: DS.attr('boolean'),
    facebookId: DS.attr('string'),
    highSchool: DS.attr('string'),
    college: DS.attr('string'),
    fhometown: DS.attr('string'),
    flink: DS.attr('string'),
    flocale: DS.attr('string'),
    flocation: DS.attr('string'),
    ftimezone: DS.attr('number'),
    zipCode: DS.attr('string'),
    isDestroyed: DS.attr('boolean'),

    // we use bs-datetimepicker addon which takes moment.js date type, so we must do some conversion when binding
    birthdayMoment: function(key, value, previousValue) {
        // setter
        if (arguments.length > 1) {
            this.set('birthday', value.toDate());
        }
        // getter
        return this.get('birthday');
    }.property('birthday'),

    avartarHostUrl: function () {
        return this.store.adapterFor('application').get('host') + '/assets/img/' + this.get('avatarUrl');
    }.property('avatarUrl'),

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
        if (this.get('nickName')) {
            return this.get('nickName');
        } else if (this.get('firstName')) {
            return this.get('firstName');
        } else {
            return '';
        }
    }.property('firstName', 'lastName', 'nickName'),

    fullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),

    availableImage: function() {
        if (!Em.isEmpty(this.get('imageData'))) {
            return this.get('imageData');
        } else {
            return this.get('avatarUrl');
        }
    }.property('avatarUrl', 'imageData')
});
