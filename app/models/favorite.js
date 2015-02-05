import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member'),
    targetObject: DS.attr('string'),
    objectType: DS.attr('string'),
    createdDate: DS.attr('date'),
    isDestroyed: DS.attr('boolean')  
});
