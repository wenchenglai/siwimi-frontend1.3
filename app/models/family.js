import DS from 'ember-data';

export default DS.Model.extend({
    zipCode: DS.attr('string'),
    city: DS.attr('string'),
    state: DS.attr('string'),
    familyName: DS.attr('string'),
    description: DS.attr('string'),
    location: DS.attr('array'),
    members: DS.hasMany('member', { embedded: 'always' }),
    isDestroyed: DS.attr('boolean'),

    hasMember: function() {
        return this.get('members').get('length') > 0;
    }.property('members').cacheable()  
});
