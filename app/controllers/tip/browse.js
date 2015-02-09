import Ember from 'ember';

export default Ember.Controller.extend({
    //queryParams: ['statusFilter', 'typeFilter'],
    //statusFilter: 'popular',
    //typeFilter: 'deal',

    //filteredArticles: function() {
    //    var statusFilter = this.get('statusFilter');
    //    var articles = this.get('model');

    //    if (statusFilter) {
    //        return articles.filterBy('staus', statusFilter);
    //    } else {
    //        return articles;
    //    }
    //}.property('statusFilter', 'typeFilter', 'model'),

    //actions: {
    //    setStatusFilter: function(status) {
    //        this.set('statusFilter', status);
    //        this.transitionToRoute('tip.browse', {queryParams: {status: this.get('statusFilter'), type: this.get('typeFilter')}});
    //    },

    //    setTypeFilter: function(type) {
    //        this.set('typeFilter', type);
    //        this.transitionToRoute('tip.browse', {queryParams: {status: this.get('statusFilter'), type: this.get('typeFilter')}});
    //    }
    //}
});
