import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ActivityDataMixin from '../../mixins/activity-data';
import PagingMixin from '../../mixins/paging';

export default Ember.Controller.extend(CommonDataMixin, ActivityDataMixin, PagingMixin, {
    pageSize: 10,
    queryCount: 0,
    isDisabled: function() {
        var self = this;

        if (self.get('queryCount') / self.get('pageSize') <= 1) {
            return "disabled";
        } else {
            return "";
        }
    }.property('queryCount', 'pageSize'),

    watchPageSize: function() {
        this.send('loadPageOnPageSizeChange');
    }.observes('pageSize'),

    pages: function() {
        var size = this.get('queryCount') / this.get('pageSize') + 1;
        return window._.range(1, size);
    }.property('queryCount', 'pageSize')
});
