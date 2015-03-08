import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    createdDate: DS.attr('date'),
    isSolved: DS.attr('boolean'),
    status: DS.attr('string'),
    answers: DS.hasMany('feedback', { embedded: 'always' }),
    viewCount: DS.attr('number'),
    isDestroyed: DS.attr('boolean'),

    // parameters set by backend ONLY
    voteUp: DS.attr('number'),
    voteDown: DS.attr('number'),
    isFavorite: DS.attr('boolean'),

    // localization fields
    city: DS.attr('string'),
    state: DS.attr('string'),    
    zipCode: DS.attr('string'),
    location: DS.attr('array')
});
