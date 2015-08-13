import Ember from 'ember';

function throttle(fn, delay){
    var context, timeout, result, args, cur, diff, prev = 0;

    function delayed() {
        prev = Date.now();
        timeout = null;
        result = fn.apply(context, args);
    }

    function throttled() {
        context = this;
        args = arguments;
        cur = Date.now();
        diff = delay - (cur - prev);
        if (diff <= 0) {
            clearTimeout(timeout);
            prev = cur;
            result = fn.apply(context, args);
        } else if (! timeout) {
            timeout = setTimeout(delayed, diff);
        }
        return result;
    }

    throttled.cancel = function(){
        clearTimeout(timeout);
    };

    return throttled;
}

export default Ember.Controller.extend({
    queryParams: ['toId', 'rootMessage'],
    toId: '',

    actions: {
        setMemberSearch: throttle(function(autocomplete, term) {
            this.set('memberSearch', term);
        }, 500)
    },

    members: function() {
        var self = this,
            members = [];

        if (!this.get('memberSearch')) {
            return members;
        }

        this.set('isLoading', true);

        self.store.find('member', { queryText: self.get('memberSearch') }).then(function(memberslist) {
            members.addObjects(memberslist);
            self.set('isLoading', false);
        });

        return members;
    }.property('memberSearch')
});
