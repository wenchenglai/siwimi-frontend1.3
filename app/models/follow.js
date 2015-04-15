import DS from 'ember-data';

export default DS.Model.extend({
    follower: DS.belongsTo('member'),
    followee: DS.belongsTo('member'),
    createdDate: DS.attr('date')
});
