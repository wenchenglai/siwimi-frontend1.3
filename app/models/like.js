import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member'),
    likeObject: DS.attr('string'),
    type: DS.attr('string')  
});
