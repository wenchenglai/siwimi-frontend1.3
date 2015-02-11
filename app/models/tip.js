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
    voteUp: DS.attr('number'),
    voteDown: DS.attr('number'),
    type: DS.attr('string'),
    viewCount: DS.attr('number'),
    isDestroyed: DS.attr('boolean'),

    // parameters set by backend ONLY
    cityState: DS.attr('string'),
    zipCode: DS.attr('string'),
    location: DS.attr('array'),
    isFavorite: DS.attr('boolean'),

    expiredDateShortDateString: function () {
        return moment(this.get('expiredDate')).format('MMM d, YYYY');
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
