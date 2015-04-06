import DS from 'ember-data';

export default DS.Model.extend({
    township: DS.attr('string'),
    stateCode: DS.attr('string'),

    cityState: function() {
        return this.get('township') + ', ' + this.get('stateCode');
    }.property('township', 'stateCode')
});
