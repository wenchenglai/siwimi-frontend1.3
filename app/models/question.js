import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member', {async: true}),
    title: DS.attr('string'),
    description: DS.attr('string'),
    createdDate: DS.attr('date'),
    isSolved: DS.attr('boolean'),
    status: DS.attr('string'),
    answers: DS.hasMany('feedback', { embedded: 'always' }),
    viewCount: DS.attr('number'),

    // parameters set by backend ONLY
    viewCount: DS.attr('number'),
    voteUp: DS.attr('number'),
    voteDown: DS.attr('number'),
    isFavorite: DS.attr('boolean'),

    // localization fields
    city: DS.attr('string'),
    state: DS.attr('string'),    
    zipCode: DS.attr('string'),
    location: DS.attr('array'),

    // data management fields
    isDeletedRecord: DS.attr('boolean'),
});
