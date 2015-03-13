import DS from 'ember-data';

export default DS.Model.extend({
    creator: DS.belongsTo('member'),
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
    imageData: DS.attr('string'),
    imageUrl: DS.attr('string'),

    // parameters set by backend ONLY
    voteUpCount: DS.attr('number'),
    voteDownCount: DS.attr('number'),

    // localization fields
    city: DS.attr('string'),
    state: DS.attr('string'),    
    zipCode: DS.attr('string'),
    location: DS.attr('array'),
    isFavorite: DS.attr('boolean'),

    //setupVoteCounts: function() {
    //    if (!this.get('voteUpCount')) {
    //        this.set('voteUpCount', 0);
    //    }

    //    if (!this.get('voteDownCount')) {
    //        this.set('voteDownCount', 0);
    //    }
    //}.on('init'),

    // we use bs-datetimepicker addon which takes moment.js date type, so we must do some conversion when binding
    expiredDateMoment: function(key, value, previousValue) {
        // setter
        if (arguments.length > 1) {
            this.set('expiredDate', value.toDate());
        }
        // getter
        return this.get('expiredDate');
    }.property('expiredDate'),

    voteCount: function () {
        return this.get('voteUpCount') - this.get('voteDownCount');
    }.property('voteUpCount', 'voteDownCount'),

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

    },

    cityState: function() {
        return this.get('city') + ', ' + this.get('state');
    }.property('city', 'state'),

    availableImage: function() {
        if (!Em.isEmpty(this.get('imageData'))) {
            return this.get('imageData');
        } else if (!Em.isEmpty(this.get('imageUrl'))) {
            return this.get('imageUrl');
        } else {
            return '/assets/images/tip.png';
        }
    }.property('imageUrl', 'imageData'),
});
