import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    createdDate: DS.attr('date'),
    isSolved: DS.attr('boolean'),
    status: DS.attr('string'),
    like: DS.attr('number'),
    viewCount: DS.attr('number'),
    isDestroyed: DS.attr('boolean'),
    answers: DS.hasMany('answer', { embedded: 'always' })  
});
