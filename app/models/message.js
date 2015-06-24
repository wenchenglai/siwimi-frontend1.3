import DS from 'ember-data';

export default DS.Model.extend({
    from: DS.belongsTo('member'),
    to: DS.belongsTo('member'),
    subject: DS.attr('string'),
    body: DS.attr('string'),
    createdDate: DS.attr('date'),
    rootMessage: DS.belongsTo('message'), // an entity Id that points to the first message in a thread
    fromStatus: DS.attr('string'), // draft, sent
    toStatus: DS.attr('string'), // unread, read, both, trash

    isChecked: DS.attr('boolean'),

    // data management fields
    isDeletedRecord: DS.attr('boolean'),

    isRead: function() {
        return this.get('toStatus') === "read" ? true : false;
    }.property('toStatus')
});
