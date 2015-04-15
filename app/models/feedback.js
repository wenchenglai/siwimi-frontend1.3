import DS from 'ember-data';
import dateHelpers from '../utils/date-helpers';

export default DS.Model.extend({
    creator: DS.belongsTo('member'),
    parent: DS.attr('string'),
    parentType: DS.attr('string'),
    createdDate: DS.attr('date'),
    comments: DS.hasMany('feedback', { embedded: 'always' }),
    description: DS.attr('string'),
    likeCount: DS.attr('number'),
    viewCount: DS.attr('number'),
    city: DS.attr('string'),
    state: DS.attr('string')
});
