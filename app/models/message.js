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
    isDestroyed: DS.attr('boolean'),

    isChecked: DS.attr('boolean'),

    subjectReduced: function () {
        return this._getSubString(this.get('subject'), 25);
    }.property('subject'),

    bodyReduced: function () {
        return this._getSubString(this.get('body'), 25);
    }.property('body'),

    isRead: function() {
        var toStatus = this.get('toStatus');
        return toStatus === "read" ? true : false; 
    }.property('toStatus'),

    _getSubString: function (str, size) {
        if (str) {
            if (str.length > size) {
                return str.substring(0, size) + "...";
            } else {
                return str;
            }
        } else {
            return "";
        }
    }  
});
