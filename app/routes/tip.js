import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return [

            { displayName: 'Browse', linkName: 'tip.browse', subMenuitems: [{ displayName: 'Deals', linkName: 'tip.browse' }, { displayName: 'Education', linkName: 'tip.browse' }, { displayName: 'Health', linkName: 'tip.browse' }] },
            { displayName: 'My Tips', linkName: 'tip.my' }
        ];        
    }
});
