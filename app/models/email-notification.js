import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member', { async: false }),
    eventNew: DS.attr('boolean'),
    eventFriendGoing: DS.attr('boolean'),
    eventFriendConsidering: DS.attr('boolean'),
    tipNew: DS.attr('boolean'),
    tipReply: DS.attr('boolean'),
    questionNew: DS.attr('boolean'),
    questionReply: DS.attr('boolean'),
    itemNew: DS.attr('boolean'),
    itemReply: DS.attr('boolean'),
    messageReply: DS.attr('boolean'),
    groupAddMember: DS.attr('boolean'),

    // data management fields
    isDeletedRecord: DS.attr('boolean')
});
