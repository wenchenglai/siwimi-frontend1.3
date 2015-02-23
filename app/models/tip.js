import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member', { async: true}),
    //discussions: DS.hasMany('discussion'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    previewText: DS.attr('string'),
    previewImage: DS.attr('string'),
    url: DS.attr('string'),
    createdDate: DS.attr('date'),
    expiredDate: DS.attr('date'),
    type: DS.attr('string'),
    viewCount: DS.attr('number'),
    isDestroyed: DS.attr('boolean'),

    // parameters set by backend ONLY
    voteUp: DS.attr('number'),
    voteDown: DS.attr('number'),
    cityState: DS.attr('string'),
    zipCode: DS.attr('string'),
    location: DS.attr('array'),
    isFavorite: DS.attr('boolean'),

    // we use bs-datetimepicker addon which takes moment.js date type, so we must do some conversion when binding
    expiredDateMoment: function(key, value, previousValue) {
        // setter
        if (arguments.length > 1) {
            this.set('expiredDate', value.toDate());
        }
        // getter
        return this.get('expiredDate');
    }.property('expiredDate'),

    titleReduced: function () {
        return this._getSubString(this.get('title'), 50);
    }.property('title'),

    descriptionReduced: function () {
        return this._getSubString(this.get('description'), 50);
    }.property('description'),

    urlReduced: function () {
        return this._getSubString(this.get('url'), 25);
    }.property('url'),

    _getSubString: function(str, size) {
        if (str) {
            if (str.length > size) {
                return str.substring(0, size) + "...";
            } else {
                return str;
            }
        } else {
            return '';
        }

    }  
});
