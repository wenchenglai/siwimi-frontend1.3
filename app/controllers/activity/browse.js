import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ActivityDataMixin from '../../mixins/activity-data';
import PagingMixin from '../../mixins/paging';

export default Ember.Controller.extend(CommonDataMixin, ActivityDataMixin, PagingMixin, {
    pageSize: 10,
    queryCount: 0,
    currentStatus: "upcoming",
    currentType: "all",

    decoratedPageSize: function(key, value, previousValue) {
        // our show page drop down shows "show 10" instead of "10"
        if (arguments.length > 1) {
          if (value) {
            this.set('pageSize', value.substring(5, 7));
          } else {
            this.set('pageSize', 10);
          }
        }
        return "Show " + this.get('pageSize');
    }.property('pageSize'),

    isDisabled: function() {
        // when there is only one page, we disable the left and right button
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

    watchCurrentStatus: function() {
      this.send('loadByStatus', this.get('currentStatus'));
    }.observes('currentStatus'),

    watchCurrentType: function() {
      this.send('loadByType', this.get('currentType'));
    }.observes('currentType'),

    // returns the paginatio array 1,2,3... depends total items and page size
    pages: function() {
        var size = this.get('queryCount') / this.get('pageSize') + 1;
        return window._.range(1, size);
    }.property('queryCount', 'pageSize')
});
